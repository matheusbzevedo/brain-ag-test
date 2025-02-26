import { Test, type TestingModule } from '@nestjs/testing';
import { RuralProducerService } from './rural-producer.service';

describe('RuralProducerService', () => {
	let service: RuralProducerService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RuralProducerService],
		}).compile();

		service = module.get<RuralProducerService>(RuralProducerService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
