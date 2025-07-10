import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    private readonly supabase: SupabaseClient;

    constructor(private readonly supabaseService: SupabaseService) {
        this.supabase = this.supabaseService.getClient();
    }

    async signUp(dto: SignUpDto) {
        const { email, password } = dto;
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password
        })
        if (error) throw new BadRequestException(error.message);
        return data;
    }

    async signIn(dto: SignInDto) {
        const { email, password } = dto;
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password
        })
        if (error) throw new BadRequestException(error.message);
        return data;
    }

    async refreshAccessToken(refreshToken: string) {
        const { data, error } = await this.supabase.auth.refreshSession({
            refresh_token: refreshToken
        })
        if (error) throw new BadRequestException(error.message);
        return data;
    }
}
