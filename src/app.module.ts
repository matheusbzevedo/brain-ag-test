import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RuralProducerModule } from './rural-producer/rural-producer.module';
import { TesteModule } from './teste/teste.module';

@Module({
	imports: [
		RuralProducerModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TesteModule,
	],
})
export class AppModule {}
