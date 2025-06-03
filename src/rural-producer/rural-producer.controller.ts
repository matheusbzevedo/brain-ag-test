import { LoggingInterceptor } from '@/logging/logging.interceptor';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRuralProducerDto } from './dto/create-rural-producer.dto';
import { UpdateRuralProducerDto } from './dto/update-rural-producer.dto';
import { RuralProducer } from './entities/rural-producer.entity';
import { RuralProducerService } from './rural-producer.service';

@UseInterceptors(LoggingInterceptor)
@ApiTags('Produtor Rural')
@Controller('rural-producer')
export class RuralProducerController {
	constructor(private readonly ruralProducerService: RuralProducerService) {}

	@Post()
	@ApiOperation({
		summary: 'Create Rural Producer',
	})
	@ApiBody({
		type: CreateRuralProducerDto,
		examples: {
			a: {
				summary: 'Filled body',
				value: {
					name: 'Matheus',
					cpfCnpj: '9999999999',
				},
			},
			b: {
				summary: 'Empty body',
				value: {},
			},
		},
	})
	@ApiOkResponse({
		type: RuralProducer,
	})
	create(
		@Body()
		createRuralProducerDto: CreateRuralProducerDto,
	): Promise<RuralProducer> {
		return this.ruralProducerService.create(createRuralProducerDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all Rural Producers' })
	@ApiOkResponse({
		type: RuralProducer,
		isArray: true,
	})
	findAll(): Promise<RuralProducer[]> {
		return this.ruralProducerService.findAll();
	}

	@Get(':cpfCnpj')
	@ApiOperation({ summary: 'Create Rural Producer' })
	@ApiOkResponse({
		description: 'The found record',
		type: RuralProducer,
	})
	findOne(@Param('cpfCnpj') cpfCnpj: string): Promise<RuralProducer> {
		return this.ruralProducerService.findOne(cpfCnpj);
	}

	@Patch(':cpfCnpj')
	@ApiOperation({ summary: 'Update Rural Producer' })
	@ApiOkResponse({ description: 'Record updated!', type: RuralProducer })
	update(
		@Param('cpfCnpj') cpfCnpj: string,
		@Body()
		updateRuralProducerDto: UpdateRuralProducerDto,
	): Promise<RuralProducer> {
		return this.ruralProducerService.update(cpfCnpj, updateRuralProducerDto);
	}

	@Delete(':cpfCnpj')
	@ApiOperation({ summary: 'Delete Rural Producer' })
	@ApiOkResponse({ description: 'Record deleted!', type: RuralProducer })
	remove(@Param('cpfCnpj') cpfCnpj: string): Promise<RuralProducer> {
		return this.ruralProducerService.remove(cpfCnpj);
	}
}
