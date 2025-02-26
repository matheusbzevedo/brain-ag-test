import { PrismaService } from '@/prisma/prisma.service';
import { RuralProducerService } from '@/rural-producer/rural-producer.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { FarmService } from './farm.service';

describe('FarmService', () => {
	let service: FarmService;
	let prismaService: PrismaService;
	let ruralProducerService: RuralProducerService;

	const mockFarm: Farm = {
		id: 1,
		name: 'Test Farm',
		city: 'Test City',
		state: 'TS',
		totalArea: 100,
		arebleArea: 50,
		vegetationArea: 50,
	};

	const mockCreateFarmDto: CreateFarmDto = {
		name: 'Test Farm',
		city: 'Test City',
		state: 'TS',
		totalArea: 100,
		arebleArea: 50,
		vegetationArea: 50,
	};

	const mockUpdateFarmDto: UpdateFarmDto = {
		name: 'Updated Farm',
		city: 'Updated City',
	};

	const mockRuralProducer = {
		id: 1,
		name: 'Test Producer',
		cpfCnpj: '12345678901',
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FarmService,
				{
					provide: PrismaService,
					useValue: {
						farm: {
							create: jest.fn().mockResolvedValue(mockFarm),
							findMany: jest.fn().mockResolvedValue([mockFarm]),
							findUnique: jest.fn().mockResolvedValue(mockFarm),
							update: jest.fn().mockResolvedValue({
								...mockFarm,
								...mockUpdateFarmDto,
							}),
							delete: jest.fn().mockResolvedValue(mockFarm),
							count: jest.fn().mockResolvedValue(10),
							aggregate: jest.fn().mockResolvedValue({
								_sum: { totalArea: 1000 },
							}),
							groupBy: jest
								.fn()
								.mockResolvedValue([
									{ state: 'TS', _count: { id: 5 }, _sum: { totalArea: 500 } },
								]),
						},
					},
				},
				{
					provide: RuralProducerService,
					useValue: {
						findOne: jest.fn().mockResolvedValue(mockRuralProducer),
					},
				},
			],
		}).compile();

		service = module.get<FarmService>(FarmService);
		prismaService = module.get<PrismaService>(PrismaService);
		ruralProducerService =
			module.get<RuralProducerService>(RuralProducerService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a farm', async () => {
			const result = await service.create('12345678901', mockCreateFarmDto);
			expect(ruralProducerService.findOne).toHaveBeenCalledWith('12345678901');
			expect(prismaService.farm.create).toHaveBeenCalled();
			expect(result).toEqual(mockFarm);
		});
	});

	describe('findAll', () => {
		it('should return all farms for a given rural producer', async () => {
			const result = await service.findAll('12345678901');
			expect(ruralProducerService.findOne).toHaveBeenCalledWith('12345678901');
			expect(prismaService.farm.findMany).toHaveBeenCalled();
			expect(result).toEqual([mockFarm]);
		});
	});

	describe('findOne', () => {
		it('should return a farm by id', async () => {
			const result = await service.findOne('12345678901', 1);
			expect(ruralProducerService.findOne).toHaveBeenCalledWith('12345678901');
			expect(prismaService.farm.findUnique).toHaveBeenCalled();
			expect(result).toEqual(mockFarm);
		});

		it('should throw HttpException if farm not found', async () => {
			jest.spyOn(prismaService.farm, 'findUnique').mockResolvedValueOnce(null);
			await expect(service.findOne('12345678901', 2)).rejects.toThrow(
				new HttpException('farm 2 not found', HttpStatus.NOT_FOUND),
			);
		});
	});

	describe('update', () => {
		it('should update a farm', async () => {
			const result = await service.update('12345678901', 1, mockUpdateFarmDto);
			expect(ruralProducerService.findOne).toHaveBeenCalled();
			expect(prismaService.farm.update).toHaveBeenCalled();
			expect(result).toEqual({ ...mockFarm, ...mockUpdateFarmDto });
		});
	});

	describe('remove', () => {
		it('should remove a farm', async () => {
			const result = await service.remove('12345678901', 1);
			expect(ruralProducerService.findOne).toHaveBeenCalled();
			expect(prismaService.farm.delete).toHaveBeenCalled();
			expect(result).toEqual(mockFarm);
		});
	});

	describe('totalFarms', () => {
		it('should return the total number of farms', async () => {
			const result = await service.totalFarms();
			expect(prismaService.farm.count).toHaveBeenCalled();
			expect(result).toEqual(10);
		});
	});

	describe('totalHectares', () => {
		it('should return the total number of hectares', async () => {
			const result = await service.totalHectares();
			expect(prismaService.farm.aggregate).toHaveBeenCalled();
			expect(result).toEqual(1000);
		});
	});

	describe('totalFarmByState', () => {
		it('should return the total number of farms by state', async () => {
			const result = await service.totalFarmByState();
			expect(prismaService.farm.groupBy).toHaveBeenCalled();
			expect(result).toEqual([
				{ state: 'TS', _count: { id: 5 }, _sum: { totalArea: 500 } },
			]);
		});
	});
});
