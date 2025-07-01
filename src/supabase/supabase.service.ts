import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TSupabaseConfig } from 'src/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private readonly supabaseConfig: TSupabaseConfig

    constructor(configService: ConfigService){
        this.supabaseConfig = configService.get<TSupabaseConfig>('supabase')!
    }

    getClient(){
        return createClient(
            this.supabaseConfig.projectUrl,
            this.supabaseConfig.anonKey
        );
    }
}
