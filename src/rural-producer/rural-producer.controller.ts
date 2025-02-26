import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { CreateRuralProducerDto } from './dto/create-rural-producer.dto';
import type { UpdateRuralProducerDto } from './dto/update-rural-producer.dto';
import type { RuralProducerService } from './rural-producer.service';

@ApiTags('rural-producer')
@Controller('rural-producer')
export class RuralProducerController {
	constructor(private readonly ruralProducerService: RuralProducerService) {}

	@Post()
	create(@Body() createRuralProducerDto: CreateRuralProducerDto) {
		return this.ruralProducerService.create(createRuralProducerDto);
	}

	@Get()
	findAll() {
		return this.ruralProducerService.findAll();
	}

	@Get(':id')
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
