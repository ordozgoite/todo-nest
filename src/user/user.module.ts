import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SupabaseModule]
})
export class UserModule {}
