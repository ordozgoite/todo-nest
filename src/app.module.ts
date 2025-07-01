import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { KafkaModule } from './kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import config from './config';

@Module({
  imports: [TasksModule, KafkaModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [config],
  }), SupabaseModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
