import { Module } from '@nestjs/common';
import { RabbyService } from './rabby.service';

@Module({
  providers: [RabbyService]
})
export class RabbyModule {}
