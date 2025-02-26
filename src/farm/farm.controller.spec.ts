import { Test, TestingModule } from '@nestjs/testing';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';

describe('FarmController', () => {
	let controller: FarmController;
	let service: FarmService;

	const mockFarm: Farm = {
		arebleArea: 50,
		city: 'Mock City',
		id: 1,
		name: 'Mock Name',
		state: 'Mock State',
		totalArea: 100,
		vegetationArea: 50,
	};

	const cpfCnpj = '99999999999';

	const mockFarmService = {
		create: jest.fn().mockResolvedValue(mockFarm),
		findAll: jest.fn().mockResolvedValue([mockFarm]),
		findOne: jest.fn().mockResolvedValue(mockFarm),
		update: jest.fn().mockResolvedValue(mockFarm),
		remove: jest.fn().mockResolvedValue(mockFarm),
		totalFarms: jest.fn().mockResolvedValue(10),
		totalHectares: jest.fn().mockResolvedValue(1000),
		totalFarmByState: jest
			.fn()
			.mockResolvedValue([{ state: 'Mock State', count: 5 }]),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FarmController],
			providers: [
				{
					provide: FarmService,
					useValue: mockFarmService,
				},
			],
		}).compile();

		controller = module.get<FarmController>(FarmController);
		service = module.get<FarmService>(FarmService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create farm', async () => {
		expect(await controller.create(cpfCnpj, mockFarm)).toEqual(mockFarm);
		expect(service.create).toHaveBeenCalled();
	});

	it('should return all farms', async () => {
		expect(await controller.findAll(cpfCnpj)).toEqual([mockFarm]);
		expect(service.findAll).toHaveBeenCalled();
	});

	it('should return one farm', async () => {
		expect(await controller.findOne(cpfCnpj, '1')).toEqual(mockFarm);
		expect(service.findOne).toHaveBeenCalledWith(cpfCnpj, 1);
	});

	it('should to update farm', async () => {
		const dto: UpdateFarmDto = { name: 'Updated Name' };
		expect(await controller.update(cpfCnpj, '1', dto)).toEqual(mockFarm);
		expect(service.update).toHaveBeenCalledWith(cpfCnpj, 1, dto);
	});

	it('should to delete a farm', async () => {
		expect(await controller.remove(cpfCnpj, '1')).toEqual(mockFarm);
		expect(service.remove).toHaveBeenCalledWith(cpfCnpj, 1);
	});

	it('should to retrieve total farms', async () => {
		expect(await controller.totalFarm()).toBe(10);
		expect(service.totalFarms).toHaveBeenCalled();
	});

	it('should to retrieve total area hectares farm', async () => {
		expect(await controller.totalHectares()).toBe(1000);
		expect(service.totalHectares).toHaveBeenCalled();
	});

	it('should to retrieve total farms by state', async () => {
		expect(await controller.totalFarmState()).toStrictEqual([
			{ state: 'Mock State', count: 5 },
		]);
		expect(service.totalFarmByState).toHaveBeenCalled();
	});
});
