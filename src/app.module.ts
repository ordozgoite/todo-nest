import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [TasksModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
