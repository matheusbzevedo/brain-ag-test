import { Test, type TestingModule } from '@nestjs/testing';
import { CreateRuralProducerDto } from './dto/create-rural-producer.dto';
import { UpdateRuralProducerDto } from './dto/update-rural-producer.dto';
import { RuralProducer } from './entities/rural-producer.entity';
import { RuralProducerController } from './rural-producer.controller';
import { RuralProducerService } from './rural-producer.service';

describe('RuralProducerController', (): void => {
	let controller: RuralProducerController;
	let service: RuralProducerService;

	const mockRuralProducer: RuralProducer = {
		name: 'Matheus',
		cpfCnpj: '9999999999',
	};

	const mockRuralProducerService = {
		create: jest.fn().mockResolvedValue(mockRuralProducer),
		findAll: jest.fn().mockResolvedValue([mockRuralProducer]),
		findOne: jest.fn().mockResolvedValue(mockRuralProducer),
		update: jest.fn().mockResolvedValue(mockRuralProducer),
		remove: jest.fn().mockResolvedValue(mockRuralProducer),
	};

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RuralProducerController],
			providers: [
				{
					provide: RuralProducerService,
					useValue: mockRuralProducerService,
				},
			],
		}).compile();

		controller = module.get<RuralProducerController>(RuralProducerController);
		service = module.get<RuralProducerService>(RuralProducerService);
	});

	it('should be defined', (): void => {
		expect(controller).toBeDefined();
	});

	it('should create a rural producer', async (): Promise<void> => {
		const dto: CreateRuralProducerDto = {
			cpfCnpj: '999999999',
			name: 'Jorge Jesus',
		};

		expect(await controller.create(dto)).toEqual(mockRuralProducer);
		expect(service.create).toHaveBeenCalled();
	});

	it('should return all rural producers', async () => {
		expect(await controller.findAll()).toEqual([mockRuralProducer]);
		expect(service.findAll).toHaveBeenCalled();
	});

	it('should return one rural producer', async () => {
		expect(await controller.findOne('9999999999')).toEqual(mockRuralProducer);
		expect(service.findOne).toHaveBeenCalledWith('9999999999');
	});

	it('should update a rural producer', async () => {
		const dto: UpdateRuralProducerDto = { name: 'Updated Name' };
		expect(await controller.update('9999999999', dto)).toEqual(
			mockRuralProducer,
		);
		expect(service.update).toHaveBeenCalledWith('9999999999', dto);
	});

	it('should delete a rural producer', async () => {
		expect(await controller.remove('9999999999')).toEqual(mockRuralProducer);
		expect(service.remove).toHaveBeenCalledWith('9999999999');
	});
});
