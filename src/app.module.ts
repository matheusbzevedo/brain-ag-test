import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RuralProducerModule } from './rural-producer/rural-producer.module';
import { PrismaService } from './prisma/prisma.service';
import { FarmModule } from './farm/farm.module';
import { HarvestModule } from './harvest/harvest.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		FarmModule,
		HarvestModule,
		RuralProducerModule,
	],
	providers: [PrismaService],
})
export class AppModule {}
