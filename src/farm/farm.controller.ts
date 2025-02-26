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
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { createUpdateFarmSchema } from 'src/schemas/createFarmSchema';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';
import { FarmService } from './farm.service';

@UseInterceptors(LoggingInterceptor)
@ApiTags('Fazenda')
@Controller('farm')
export class FarmController {
	constructor(private readonly farmService: FarmService) {}

	@Get('/total')
	@ApiOperation({ summary: 'Get total farms' })
	@ApiOkResponse({
		description: 'Get total farms',
		type: Number,
	})
	totalFarm(): Promise<number> {
		return this.farmService.totalFarms();
	}

	@Get('/total-hectares')
	@ApiOperation({ summary: 'Get total hectares' })
	@ApiOkResponse({
		description: 'Get total hectares',
		type: Number,
	})
	totalHectares(): Promise<number> {
		return this.farmService.totalHectares();
	}

	@Get('/total-farm-state')
	@ApiOperation({ summary: 'Get total farms by state' })
	@ApiOkResponse({
		description: 'Get total farms by state',
	})
	totalFarmState() {
		return this.farmService.totalFarmByState();
	}

	@Post(':cpfCnpj')
	@ApiOperation({ summary: 'Create Farm' })
	@ApiOkResponse({
		description: 'Create farm record',
		type: Farm,
	})
	create(
		@Param('cpfCnpj') cpfCnpj: string,
		@Body(new ZodValidationPipe(createUpdateFarmSchema))
		createFarmDto: CreateFarmDto,
	): Promise<Farm> {
		return this.farmService.create(cpfCnpj, createFarmDto);
	}

	@Get(':cpfCnpj')
	@ApiOperation({ summary: 'Get all farms by rural producer id' })
	@ApiOkResponse({
		description: 'Get farm records',
		type: Farm,
		isArray: true,
	})
	findAll(@Param('cpfCnpj') cpfCnpj: string): Promise<Farm[]> {
		return this.farmService.findAll(cpfCnpj);
	}

	@Get(':cpfCnpj/:farmId')
	@ApiOperation({ summary: 'Get farm' })
	@ApiOkResponse({
		description: 'Get farm record',
		type: Farm,
	})
	findOne(
		@Param('cpfCnpj') cpfCnpj: string,
		@Param('farmId') farmId: string,
	): Promise<Farm> {
		return this.farmService.findOne(cpfCnpj, Number(farmId));
	}

	@Patch(':cpfCnpj/:farmId')
	@ApiOperation({ summary: 'Update farm' })
	@ApiOkResponse({
		description: 'Update farm record',
		type: Farm,
	})
	update(
		@Param('cpfCnpj') cpfCnpj: string,
		@Param('farmId') farmId: string,
		@Body(new ZodValidationPipe(createUpdateFarmSchema))
		updateFarmDto: UpdateFarmDto,
	): Promise<Farm> {
		return this.farmService.update(cpfCnpj, Number(farmId), updateFarmDto);
	}

	@Delete(':cpfCnpj/:farmId')
	@ApiOperation({ summary: 'Delete farm' })
	@ApiOkResponse({
		description: 'Delete farm record',
		type: Farm,
	})
	remove(
		@Param('cpfCnpj') cpfCnpj: string,
		@Param('farmId') farmId: string,
	): Promise<Farm> {
		return this.farmService.remove(cpfCnpj, Number(farmId));
	}
}
