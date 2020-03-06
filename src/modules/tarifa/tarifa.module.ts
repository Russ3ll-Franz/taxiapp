import { Module } from '@nestjs/common';
import { TarifaService } from './tarifa.service';
import { TarifaController } from './tarifa.controller';

@Module({
  providers: [TarifaService],
  controllers: [TarifaController]
})
export class TarifaModule {}
