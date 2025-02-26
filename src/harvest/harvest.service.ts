import { FarmService } from '@/farm/farm.service';
import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { Harvest } from './entities/harvest.entity';

@Injectable()
export class HarvestService {
	constructor(
		private readonly farmService: FarmService,
		private readonly prismaService: PrismaService,
	) {}

	async create(
		cpfCnpj: string,
		farmId: number,
		createHarvestDto: CreateHarvestDto,
	): Promise<Harvest> {
		const { year } = createHarvestDto;
		await this.farmService.findOne(cpfCnpj, farmId);

		const existingHarvest = await this.prismaService.harvest.findUnique({
			where: { year },
		});

		if (existingHarvest) {
			throw new HttpException(
				'Harvest with this year already exists',
				HttpStatus.BAD_REQUEST,
			);
		}

		return await this.prismaService.harvest.create({
			data: { ...createHarvestDto, farmId },
			omit: {
				farmId: true,
			},
		});
	}

	async findAll(cpfCnpj: string, farmId: number): Promise<Harvest[]> {
		await this.farmService.findOne(cpfCnpj, farmId);

		return this.prismaService.harvest.findMany({ where: { farmId } });
	}

	async findOne(
		cpfCnpj: string,
		farmId: number,
		year: string,
	): Promise<Harvest> {
		await this.farmService.findOne(cpfCnpj, farmId);

		const harvest = await this.prismaService.harvest.findUnique({
			where: { year },
		});

		if (!harvest) {
			throw new HttpException(
				`Harvest ${year} not found`,
				HttpStatus.NOT_FOUND,
			);
		}

		return harvest;
	}

	async update(
		cpfCnpj: string,
		farmId: number,
		year: string,
		updateHarvestDto: UpdateHarvestDto,
	): Promise<Harvest> {
		await this.findOne(cpfCnpj, farmId, year);

		return this.prismaService.harvest.update({
			data: updateHarvestDto,
			where: { year },
		});
	}

	async remove(
		cpfCnpj: string,
		farmId: number,
		year: string,
	): Promise<Harvest> {
		await this.findOne(cpfCnpj, farmId, year);

		return await this.prismaService.harvest.delete({ where: { year } });
	}
}
