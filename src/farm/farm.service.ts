import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './entities/farm.entity';

@Injectable()
export class FarmService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(cpfCnpj: string, createFarmDto: CreateFarmDto): Promise<Farm> {
		const user = await this.prismaService.ruralProducer.findUnique({
			where: { cpfCnpj },
		});

		if (!user) {
			throw new HttpException(
				`Rural producer ${cpfCnpj} not found`,
				HttpStatus.NOT_FOUND,
			);
		}

		return await this.prismaService.farm.create({
			data: { ...createFarmDto, ruralProducerCpfCnpj: cpfCnpj },
		});
	}

	findAll() {
		return `This action returns all farm`;
	}

	findOne(id: number) {
		return `This action returns a #${id} farm`;
	}

	update(id: number, updateFarmDto: UpdateFarmDto) {
		return `This action updates a #${id} farm`;
	}

	remove(id: number) {
		return `This action removes a #${id} farm`;
	}
}
