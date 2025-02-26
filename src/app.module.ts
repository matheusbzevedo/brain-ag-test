import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FarmModule } from './farm/farm.module';
import { HarvestModule } from './harvest/harvest.module';
import { RuralProducerModule } from './rural-producer/rural-producer.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		FarmModule,
		HarvestModule,
		RuralProducerModule,
	],
})
export class AppModule {}
