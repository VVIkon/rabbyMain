import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PublisherService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendMessage(data: any) {
    try {
      await this.client.emit('event_name', data).toPromise();
      console.log('Message confirmed by broker');
    } catch (error) {
      console.error('Message not confirmed', error);
      // Логика повторной отправки
    }
  }
}