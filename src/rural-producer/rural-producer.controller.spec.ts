import { Test, type TestingModule } from '@nestjs/testing';
import { RuralProducerController } from './rural-producer.controller';
import { RuralProducerService } from './rural-producer.service';

describe('RuralProducerController', () => {
	let controller: RuralProducerController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RuralProducerController],
			providers: [RuralProducerService],
		}).compile();

		controller = module.get<RuralProducerController>(RuralProducerController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
