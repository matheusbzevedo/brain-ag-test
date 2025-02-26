import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRuralProducerDto } from './dto/create-rural-producer.dto';
import type { UpdateRuralProducerDto } from './dto/update-rural-producer.dto';
import { RuralProducer } from './entities/rural-producer.entity';
import { RuralProducerService } from './rural-producer.service';

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
		@Body() createRuralProducerDto: CreateRuralProducerDto,
	): Promise<RuralProducer> {
		return this.ruralProducerService.create(createRuralProducerDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all Rural Producers' })
	@ApiOkResponse({
		type: RuralProducer,
		isArray: true,
	})
	findAll() {
		return this.ruralProducerService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Create Rural Producer' })
	@ApiOkResponse({
		description: 'The found record',
		type: RuralProducer,
	})
	findOne(@Param('id') id: string) {
		return this.ruralProducerService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateRuralProducerDto: UpdateRuralProducerDto,
	) {
		return this.ruralProducerService.update(+id, updateRuralProducerDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.ruralProducerService.remove(+id);
	}
}
