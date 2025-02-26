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
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { HarvestService } from './harvest.service';

@ApiTags('Safra')
@Controller('harvest')
export class HarvestController {
	constructor(private readonly harvestService: HarvestService) {}

	@Post()
	create(@Body() createHarvestDto: CreateHarvestDto) {
		return this.harvestService.create(createHarvestDto);
	}

	@Get()
	findAll() {
		return this.harvestService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.harvestService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateHarvestDto: UpdateHarvestDto) {
		return this.harvestService.update(+id, updateHarvestDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.harvestService.remove(+id);
	}
}
