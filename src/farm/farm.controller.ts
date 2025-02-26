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
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { FarmService } from './farm.service';

@ApiTags('Fazenda')
@Controller('farm')
export class FarmController {
	constructor(private readonly farmService: FarmService) {}

	@Post(':cpfCnpj')
	create(
		@Param('cpfCnpj') cpfCnpj: string,
		@Body() createFarmDto: CreateFarmDto,
	): Promise<Farm> {
		return this.farmService.create(cpfCnpj, createFarmDto);
	}

	@Get()
	findAll() {
		return this.farmService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.farmService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
		return this.farmService.update(+id, updateFarmDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.farmService.remove(+id);
	}
}
