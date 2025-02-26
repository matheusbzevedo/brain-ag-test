import { Test, TestingModule } from '@nestjs/testing';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';

describe('HarvestController', () => {
	let controller: HarvestController;
	let service: HarvestService;

	const mockHarvest = {
		year: '2025',
		crop: ['Soja', 'Milho'],
	};

	const cpfCnpj = '99999999999';

	const mockHarvestService = {
		create: jest.fn().mockResolvedValue(mockHarvest),
		findAll: jest.fn().mockResolvedValue([mockHarvest]),
		findOne: jest.fn().mockResolvedValue(mockHarvest),
		update: jest.fn().mockResolvedValue(mockHarvest),
		remove: jest.fn().mockResolvedValue(mockHarvest),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [HarvestController],
			providers: [
				{
					provide: HarvestService,
					useValue: mockHarvestService,
				},
			],
		}).compile();

		controller = module.get<HarvestController>(HarvestController);
		service = module.get<HarvestService>(HarvestService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should to create harvest', async () => {
		expect(await controller.create(cpfCnpj, '1', mockHarvest)).toStrictEqual(
			mockHarvest,
		);
		expect(service.create).toHaveBeenCalled();
	});

	it('should return all harvests', async () => {
		expect(await controller.findAll(cpfCnpj, '1')).toStrictEqual([mockHarvest]);
		expect(service.findAll).toHaveBeenCalled();
	});

	it('should return one specific harvest', async () => {
		expect(await controller.findOne(cpfCnpj, '1', '2025')).toStrictEqual(
			mockHarvest,
		);
		expect(service.findOne).toHaveBeenCalledWith(cpfCnpj, 1, '2025');
	});

	it('should to update harvest', async () => {
		const dto: UpdateHarvestDto = { crop: ['Soja'], year: '2026' };
		expect(await controller.update(cpfCnpj, '1', '2025', dto)).toEqual(
			mockHarvest,
		);
		expect(service.update).toHaveBeenCalledWith(cpfCnpj, 1, '2025', dto);
	});

	it('should to delete harvest', async () => {
		expect(await controller.remove(cpfCnpj, '1', '2025')).toEqual(mockHarvest);
		expect(service.remove).toHaveBeenCalledWith(cpfCnpj, 1, '2025');
	});
});
