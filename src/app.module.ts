import { Module } from '@nestjs/common';
import { PersonModule } from './module/person/person.module';
import { RabbyModule } from './module/rabby/rabby.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport, RmqOptions } from '@nestjs/microservices';


function validateConfig(config: Record<string, unknown>) {
  if (!config.SERVER_PORT || config.SERVER_PORT === 0) {
    throw new Error('Invalid Server Port in configuration');
  }
  if (!config.RABBIT_URL || !config.RABBIT_QUEUE1) {
    throw new Error('Invalid Rabbit in configuration');
  }

  return config;
}

@Module({
  imports: [
    PersonModule, 
    RabbyModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validateConfig,
    }),
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        useFactory: (configService: ConfigService): RmqOptions => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBIT_URL')],
            queue: configService.getOrThrow<string>('RABBIT_QUEUE1'),
            queueOptions: {
              durable: true,
            },
            socketOptions: {
              reconnectTimeInSeconds: configService.getOrThrow<number>('RABBIT_RECONNECT'), // Интервал переподключения
              heartbeatIntervalInSeconds: configService.getOrThrow<number>('RABBIT_HEARTBEAT'), // интервал проверки активности соединения между клиентом и сервером 
            },
            maxConnectionAttempts: -1, // Бесконечные попытки (-1)
            noAck: false, // требуем подтверждения от потребителя
            persistent: true, // сообщения сохраняются на диск
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [ConfigService],
})
export class AppModule {}
