import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';

@Module({
	controllers: [FarmController],
	providers: [FarmService, PrismaService],
})
export class FarmModule {}
