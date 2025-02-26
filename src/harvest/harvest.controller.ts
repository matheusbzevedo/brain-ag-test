import { LoggingInterceptor } from '@/logging/logging.interceptor';
import { createHarvestSchema } from '@/schemas/createHarvestSchema';
import { updateHarvestSchema } from '@/schemas/updateHarvestSchema';
import { ZodValidationPipe } from '@/zod-validation/zod-validation.pipe';
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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { Harvest } from './entities/harvest.entity';
import { HarvestService } from './harvest.service';

@UseInterceptors(LoggingInterceptor)
@ApiTags('Safra')
@Controller('harvest')
export class HarvestController {
	constructor(private readonly harvestService: HarvestService) {}

	@Post(':cpfCnpj/:farmId')
	@ApiOperation({ summary: 'Create harvest' })
	@ApiOkResponse({
		description: 'Create harvest',
		type: Harvest,
	})
	create(
		@Param('cpfCnpj') cpfCnpj: string,
		@Param('farmId') farmId: string,
		@Body(new ZodValidationPipe(createHarvestSchema))
		createHarvestDto: CreateHarvestDto,
	): Promise<Harvest> {
		return this.harvestService.create(
			cpfCnpj,
			Number(farmId),
			createHarvestDto,
		);
	}

	@Get(':cpfCnpj/:farmId')
	@ApiOperation({ summary: 'Get all harvest by farm id' })
	@ApiOkResponse({
		description: 'Get all harvest by farm id',
		type: Harvest,
		isArray: true,
	})
	findAll(
		@Param('cpfCnpj') cpfCnpj: string,
		@Param('farmId') farmId: string,
	): Promise<Harvest[]> {
		return this.harvestService.findAll(cpfCnpj, Number(farmId));
	}

	@Get(':cpfCnpj/:farmId/:year')
	@ApiOperation({ summary: 'Get specific harvest' })
	@ApiOkResponse({
		description: 'Get specific harvest',
		type: Harvest,
	})
	findOne(
		@Param('cpfCnpj') cpfCnpj: string,
		@Param('farmId') farmId: string,
		@Param('year') year: string,
	): Promise<Harvest> {
		return this.harvestService.findOne(cpfCnpj, Number(farmId), year);
	}

	@Patch(':cpfCnpj/:farmId/:year')
	@ApiOperation({ summary: 'Update harvest record' })
	@ApiOkResponse({
		description: 'Update harvest record',
		type: Harvest,
	})
	update(
		@Param('cpfCnpj') cpfCnpj: string,
		@Param('farmId') farmId: string,
		@Param('year') year: string,
		@Body(new ZodValidationPipe(updateHarvestSchema))
		updateHarvestDto: UpdateHarvestDto,
	): Promise<Harvest> {
		return this.harvestService.update(
			cpfCnpj,
			Number(farmId),
			year,
			updateHarvestDto,
		);
	}

	@Delete(':cpfCnpj/:farmId/:year')
	@ApiOperation({ summary: 'Delete harvest record' })
	@ApiOkResponse({
		description: 'Delete harvest record',
		type: Harvest,
	})
	remove(
		@Param('cpfCnpj') cpfCnpj: string,
		@Param('farmId') farmId: string,
		@Param('year') year: string,
	): Promise<Harvest> {
		return this.harvestService.remove(cpfCnpj, Number(farmId), year);
	}
}
