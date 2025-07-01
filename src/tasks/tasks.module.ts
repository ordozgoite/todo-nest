import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { KafkaModule } from '../kafka/kafka.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [KafkaModule, SupabaseModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
