import { PrismaService } from '@/prisma/prisma.service';
import { RuralProducerService } from '@/rural-producer/rural-producer.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';

@Injectable()
export class FarmService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly ruralProducerService: RuralProducerService,
	) {}

	async create(cpfCnpj: string, createFarmDto: CreateFarmDto): Promise<Farm> {
		await this.ruralProducerService.findOne(cpfCnpj);

		return await this.prismaService.farm.create({
			data: { ...createFarmDto, ruralProducerCpfCnpj: cpfCnpj },
			omit: {
				ruralProducerCpfCnpj: true,
			},
		});
	}

	async findAll(cpfCnpj: string): Promise<Farm[]> {
		await this.ruralProducerService.findOne(cpfCnpj);

		return await this.prismaService.farm.findMany({
			where: { ruralProducerCpfCnpj: cpfCnpj },
			omit: {
				ruralProducerCpfCnpj: true,
			},
		});
	}

	async findOne(cpfCnpj: string, id: number): Promise<Farm> {
		await this.ruralProducerService.findOne(cpfCnpj);

		const farm = await this.prismaService.farm.findUnique({
			where: { ruralProducerCpfCnpj: cpfCnpj, id },
			omit: {
				ruralProducerCpfCnpj: true,
			},
		});

		if (!farm) {
			throw new HttpException(`farm ${id} not found`, HttpStatus.NOT_FOUND);
		}

		return farm;
	}

	async update(
		cpfCnpj: string,
		id: number,
		updateFarmDto: UpdateFarmDto,
	): Promise<Farm> {
		await this.findOne(cpfCnpj, id);

		return await this.prismaService.farm.update({
			data: updateFarmDto,
			where: { ruralProducerCpfCnpj: cpfCnpj, id },
			omit: {
				ruralProducerCpfCnpj: true,
			},
		});
	}

	async remove(cpfCnpj: string, id: number): Promise<Farm> {
		await this.findOne(cpfCnpj, id);

		return await this.prismaService.farm.delete({
			where: { ruralProducerCpfCnpj: cpfCnpj, id },
		});
	}

	async totalFarms(): Promise<number> {
		return await this.prismaService.farm.count();
	}

	async totalHectares(): Promise<number> {
		const response = await this.prismaService.farm.aggregate({
			_sum: {
				totalArea: true,
			},
		});

		return response._sum.totalArea || 0;
	}

	async totalFarmByState() {
		const response = await this.prismaService.farm.groupBy({
			by: 'state',
			_count: { id: true },
			_sum: { totalArea: true },
		});

		return response;
	}
}
