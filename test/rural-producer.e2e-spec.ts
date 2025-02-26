import { LoggingInterceptor } from '@/logging/logging.interceptor';
import { CreateRuralProducerDto } from '@/rural-producer/dto/create-rural-producer.dto';
import { UpdateRuralProducerDto } from '@/rural-producer/dto/update-rural-producer.dto';
import { RuralProducerService } from '@/rural-producer/rural-producer.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('RuralProducerController (e2e)', () => {
	let app: INestApplication;
	let ruralProducerService: RuralProducerService;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalInterceptors(new LoggingInterceptor());
		await app.init();

		ruralProducerService = app.get<RuralProducerService>(RuralProducerService);

		// Clear the database before each test
		await ruralProducerService
			.findAll()
			.then((producers) =>
				Promise.all(
					producers.map((producer) =>
						ruralProducerService.remove(producer.cpfCnpj),
					),
				),
			);
	});

	afterEach(async () => {
		await app.close();
	});

	describe('/rural-producer (POST)', () => {
		it('should create a rural producer', async () => {
			const createRuralProducerDto: CreateRuralProducerDto = {
				name: 'John Doe',
				cpfCnpj: '12345678901',
			};

			const response = await request(app.getHttpServer())
				.post('/rural-producer')
				.send(createRuralProducerDto)
				.expect(201);

			expect(response.body).toEqual({
				id: expect.any(Number),
				...createRuralProducerDto,
			});
		});

		it('should return 400 for invalid input', async () => {
			await request(app.getHttpServer())
				.post('/rural-producer')
				.send({})
				.expect(400);
		});
	});

	describe('/rural-producer (GET)', () => {
		it('should return all rural producers', async () => {
			const createRuralProducerDto: CreateRuralProducerDto = {
				name: 'Jane Doe',
				cpfCnpj: '10987654321',
			};
			await ruralProducerService.create(createRuralProducerDto);

			const response = await request(app.getHttpServer())
				.get('/rural-producer')
				.expect(200);

			expect(response.body).toEqual([
				{
					id: expect.any(Number),
					...createRuralProducerDto,
				},
			]);
		});

		it('should return an empty array if no producers exist', async () => {
			const response = await request(app.getHttpServer())
				.get('/rural-producer')
				.expect(200);

			expect(response.body).toEqual([]);
		});
	});

	describe('/rural-producer/:cpfCnpj (GET)', () => {
		it('should return a rural producer by cpfCnpj', async () => {
			const createRuralProducerDto: CreateRuralProducerDto = {
				name: 'Alice Smith',
				cpfCnpj: '11223344556',
			};
			await ruralProducerService.create(createRuralProducerDto);

			const response = await request(app.getHttpServer())
				.get(`/rural-producer/${createRuralProducerDto.cpfCnpj}`)
				.expect(200);

			expect(response.body).toEqual({
				id: expect.any(Number),
				...createRuralProducerDto,
			});
		});

		it('should return 404 if producer does not exist', async () => {
			await request(app.getHttpServer())
				.get('/rural-producer/nonexistent')
				.expect(404);
		});
	});

	describe('/rural-producer/:cpfCnpj (PATCH)', () => {
		it('should update a rural producer', async () => {
			const createRuralProducerDto: CreateRuralProducerDto = {
				name: 'Bob Johnson',
				cpfCnpj: '66554433221',
			};
			const createdProducer = await ruralProducerService.create(
				createRuralProducerDto,
			);

			const updateRuralProducerDto: UpdateRuralProducerDto = {
				name: 'Updated Bob',
			};

			const response = await request(app.getHttpServer())
				.patch(`/rural-producer/${createdProducer.cpfCnpj}`)
				.send(updateRuralProducerDto)
				.expect(200);

			expect(response.body).toEqual({
				id: expect.any(Number),
				cpfCnpj: createdProducer.cpfCnpj,
				name: updateRuralProducerDto.name,
			});
		});

		it('should return 400 for invalid update input', async () => {
			await request(app.getHttpServer())
				.patch('/rural-producer/12345678901')
				.send({})
				.expect(400);
		});

		it('should return 404 if producer does not exist', async () => {
			await request(app.getHttpServer())
				.patch('/rural-producer/nonexistent')
				.send({ name: 'Updated Name' })
				.expect(404);
		});
	});

	describe('/rural-producer/:cpfCnpj (DELETE)', () => {
		it('should delete a rural producer', async () => {
			const createRuralProducerDto: CreateRuralProducerDto = {
				name: 'Charlie Brown',
				cpfCnpj: '11223344557',
			};
			const createdProducer = await ruralProducerService.create(
				createRuralProducerDto,
			);

			await request(app.getHttpServer())
				.delete(`/rural-producer/${createdProducer.cpfCnpj}`)
				.expect(200);

			await request(app.getHttpServer())
				.get(`/rural-producer/${createdProducer.cpfCnpj}`)
				.expect(404);
		});

		it('should return 404 if producer does not exist', async () => {
			await request(app.getHttpServer())
				.delete('/rural-producer/nonexistent')
				.expect(404);
		});
	});
});
