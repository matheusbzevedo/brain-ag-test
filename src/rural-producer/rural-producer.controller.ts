import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { CreateRuralProducerDto } from './dto/create-rural-producer.dto';
import type { UpdateRuralProducerDto } from './dto/update-rural-producer.dto';
import { RuralProducer } from './entities/rural-producer.entity';
import { RuralProducerService } from './rural-producer.service';

@ApiTags('Produtor Rural')
@Controller('rural-producer')
export class RuralProducerController {
	constructor(private readonly ruralProducerService: RuralProducerService) {}

	@Post()
	@ApiOperation({ summary: 'Create Rural Producer' })
	create(@Body() createRuralProducerDto: CreateRuralProducerDto) {
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
