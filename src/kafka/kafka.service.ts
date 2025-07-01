import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';
import { TKafkaConfig } from 'src/config';

@Injectable()
export class KafkaService implements OnModuleInit {
  private readonly kafkaConfig: TKafkaConfig;
  private producer: Producer;

  constructor(private readonly configService: ConfigService) {
    this.kafkaConfig = this.configService.get<TKafkaConfig>('kafka')!;
  }

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: this.kafkaConfig.clientId,
      brokers: this.kafkaConfig.brokersUrl,
    });

    this.producer = kafka.producer();
    await this.producer.connect();
  }

  async sendMessage(topic: string, key: string, value: any) {
    await this.producer.send({
      topic,
      messages: [{ key, value: JSON.stringify(value) }],
    });
  }
}
