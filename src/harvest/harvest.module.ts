import { FarmService } from '@/farm/farm.service';
import { PrismaService } from '@/prisma/prisma.service';
import { RuralProducerService } from '@/rural-producer/rural-producer.service';
import { Module } from '@nestjs/common';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';

@Module({
	controllers: [HarvestController],
	providers: [HarvestService, FarmService, PrismaService, RuralProducerService],
})
export class HarvestModule {}
