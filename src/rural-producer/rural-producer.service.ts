import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { CreateRuralProducerDto } from './dto/create-rural-producer.dto';
import type { UpdateRuralProducerDto } from './dto/update-rural-producer.dto';
import { RuralProducer } from './entities/rural-producer.entity';

@Injectable()
export class RuralProducerService {
	constructor(private readonly prisma: PrismaService) {}

	async create(
		createRuralProducerDto: CreateRuralProducerDto,
	): Promise<RuralProducer> {
		return await this.prisma.ruralProducer.create({
			data: createRuralProducerDto,
		});
	}

	async findAll(): Promise<RuralProducer[]> {
		const ruralProducers = await this.prisma.ruralProducer.findMany();

		return ruralProducers;
	}

	async findOne(cpfCnpj: string): Promise<RuralProducer> {
		const ruralProducer = await this.prisma.ruralProducer.findUnique({
			where: { cpfCnpj },
		});

		if (!ruralProducer) {
			throw new HttpException(
				`Rural producer ${cpfCnpj} not found`,
				HttpStatus.NOT_FOUND,
			);
		}

		return ruralProducer;
	}

	async update(
		cpfCnpj: string,
		updateRuralProducerDto: UpdateRuralProducerDto,
	): Promise<RuralProducer> {
		const ruralProducer = await this.prisma.ruralProducer.findUnique({
			where: { cpfCnpj },
		});

		if (!ruralProducer) {
			throw new HttpException(
				`Rural producer ${cpfCnpj} not found`,
				HttpStatus.NOT_FOUND,
			);
		}

		return await this.prisma.ruralProducer.update({
			data: updateRuralProducerDto,
			where: { cpfCnpj },
		});
	}

	async remove(cpfCnpj: string): Promise<RuralProducer> {
		const ruralProducer = await this.prisma.ruralProducer.findUnique({
			where: { cpfCnpj },
		});

		if (!ruralProducer) {
			throw new HttpException(
				`Rural producer ${cpfCnpj} not found`,
				HttpStatus.NOT_FOUND,
			);
		}

		return await this.prisma.ruralProducer.delete({ where: { cpfCnpj } });
	}
}
