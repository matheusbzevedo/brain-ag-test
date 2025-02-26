import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { UpdateRuralProducerDto } from './dto/update-rural-producer.dto';
import { RuralProducerService } from './rural-producer.service';

describe('RuralProducerService', () => {
	let service: RuralProducerService;
	let prisma: PrismaService;

	const mockRuralProducer = {
		cpfCnpj: '999999999',
		name: 'Jorge Jesus',
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RuralProducerService,
				{
					provide: PrismaService,
					useValue: {
						ruralProducer: {
							create: jest.fn(),
							delete: jest.fn(),
							findMany: jest.fn(),
							findUnique: jest.fn(),
							update: jest.fn(),
						},
					},
				},
			],
		}).compile();

		service = module.get<RuralProducerService>(RuralProducerService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should to be create a rural producer successfully', async () => {
		jest.spyOn(prisma.ruralProducer, 'findUnique').mockResolvedValue(null);
		jest
			.spyOn(prisma.ruralProducer, 'create')
			.mockResolvedValue(mockRuralProducer);

		const result = await service.create(mockRuralProducer);
		expect(result).toEqual(mockRuralProducer);
		expect(prisma.ruralProducer.findUnique).toHaveBeenCalledWith({
			where: { cpfCnpj: mockRuralProducer.cpfCnpj },
		});
		expect(prisma.ruralProducer.create).toHaveBeenCalledWith({
			data: mockRuralProducer,
		});
	});

	it('should to throw error if rural producer already exists', async () => {
		jest
			.spyOn(prisma.ruralProducer, 'findUnique')
			.mockResolvedValue(mockRuralProducer);

		await expect(service.create(mockRuralProducer)).rejects.toThrow(
			new HttpException(
				'Rural producer with this CPF/CNPJ is already exists',
				HttpStatus.BAD_REQUEST,
			),
		);
		expect(prisma.ruralProducer.findUnique).toHaveBeenCalled();
		expect(prisma.ruralProducer.create).not.toHaveBeenCalled();
	});

	it('should to retrieve rural producers', async () => {
		jest
			.spyOn(prisma.ruralProducer, 'findMany')
			.mockResolvedValue([mockRuralProducer]);

		const result = await service.findAll();

		expect(result).toEqual([mockRuralProducer]);
		expect(prisma.ruralProducer.findMany).toHaveBeenCalled();
	});

	it('should to retrieve a rural producer if found', async () => {
		jest
			.spyOn(prisma.ruralProducer, 'findUnique')
			.mockResolvedValue(mockRuralProducer);

		const result = await service.findOne(mockRuralProducer.cpfCnpj);

		expect(result).toEqual(mockRuralProducer);
		expect(prisma.ruralProducer.findUnique).toHaveBeenCalledWith({
			where: { cpfCnpj: mockRuralProducer.cpfCnpj },
			include: {
				Farms: {
					omit: {
						ruralProducerCpfCnpj: true,
					},
				},
			},
		});
	});

	it('should to throw error if rural producer is not found', async () => {
		jest.spyOn(prisma.ruralProducer, 'findUnique').mockResolvedValue(null);

		await expect(service.findOne(mockRuralProducer.cpfCnpj)).rejects.toThrow(
			new HttpException(
				`Rural producer ${mockRuralProducer.cpfCnpj} not found`,
				HttpStatus.NOT_FOUND,
			),
		);

		expect(prisma.ruralProducer.findUnique).toHaveBeenCalled();
	});

	it('should to update rural producer', async () => {
		jest
			.spyOn(prisma.ruralProducer, 'findUnique')
			.mockResolvedValue(mockRuralProducer);
		jest.spyOn(prisma.ruralProducer, 'update').mockResolvedValue({
			...mockRuralProducer,
			name: 'Updated Name',
		});

		const updateDto: UpdateRuralProducerDto = { name: 'Updated Name' };
		const result = await service.update(mockRuralProducer.cpfCnpj, updateDto);

		expect(result.name).toEqual('Updated Name');
		expect(prisma.ruralProducer.update).toHaveBeenCalledWith({
			where: { cpfCnpj: mockRuralProducer.cpfCnpj },
			data: updateDto,
		});
	});

	it('should to throw error if rural producer not exists on update', async () => {
		jest.spyOn(prisma.ruralProducer, 'findUnique').mockResolvedValue(null);

		await expect(
			service.update(mockRuralProducer.cpfCnpj, { name: 'Updated Name' }),
		).rejects.toThrow(
			new HttpException(
				`Rural producer ${mockRuralProducer.cpfCnpj} not found`,
				HttpStatus.NOT_FOUND,
			),
		);

		expect(prisma.ruralProducer.update).not.toHaveBeenCalled();
	});

	it('should to delete rural producer', async () => {
		jest
			.spyOn(prisma.ruralProducer, 'findUnique')
			.mockResolvedValue(mockRuralProducer);
		jest
			.spyOn(prisma.ruralProducer, 'delete')
			.mockResolvedValue(mockRuralProducer);

		const result = await service.remove(mockRuralProducer.cpfCnpj);

		expect(result).toEqual(mockRuralProducer);
		expect(prisma.ruralProducer.delete).toHaveBeenCalledWith({
			where: { cpfCnpj: mockRuralProducer.cpfCnpj },
		});
	});

	it('should to throw error if rural producer not exists on delete', async () => {
		jest.spyOn(prisma.ruralProducer, 'findUnique').mockResolvedValue(null);

		await expect(service.remove(mockRuralProducer.cpfCnpj)).rejects.toThrow(
			new HttpException(
				`Rural producer ${mockRuralProducer.cpfCnpj} not found`,
				HttpStatus.NOT_FOUND,
			),
		);

		expect(prisma.ruralProducer.delete).not.toHaveBeenCalled();
	});
});
