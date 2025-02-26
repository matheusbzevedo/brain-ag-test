import { PrismaService } from '@/prisma/prisma.service';
import { RuralProducerService } from '@/rural-producer/rural-producer.service';
import { Module } from '@nestjs/common';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';

@Module({
	controllers: [FarmController],
	providers: [FarmService, PrismaService, RuralProducerService],
})
export class FarmModule {}
