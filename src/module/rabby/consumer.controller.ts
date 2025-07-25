import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class ConsumerController {
  @EventPattern('event_name')
  async handleEvent(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      // Обработка сообщения
      console.log('Processing message:', data);
      
      // Подтверждаем обработку
      channel.ack(originalMsg);
    } catch (error) {
      console.error('Processing failed', error);
      
      // Отказываемся от сообщения (можно настроить повторную очередь)
      channel.nack(originalMsg, false, false);
    }
  }
}