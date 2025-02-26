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
		try {
			const response = await this.prisma.ruralProducer.create({
				data: createRuralProducerDto,
			});

			return response;
		} catch (error) {
			console.log(error);
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: error.msg,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	findAll() {
		return 'This action returns all ruralProducer';
	}

	findOne(id: number) {
		return `This action returns a #${id} ruralProducer`;
	}

	update(id: number, updateRuralProducerDto: UpdateRuralProducerDto) {
		return `This action updates a #${id} ruralProducer`;
	}

	remove(id: number) {
		return `This action removes a #${id} ruralProducer`;
	}
}
