import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    private readonly supabase: SupabaseClient;

    constructor(private readonly supabaseService: SupabaseService) {
        this.supabase = this.supabaseService.getClient();
    }

    async createProfile(userId: string, dto: CreateUserDto) {
        const { full_name, username } = dto;
        const { data, error } = await this.supabase
            .from('profiles')
            .insert({
                id: userId,
                full_name,
                username
            });
        if (error) throw new Error(error.message);
        return data;
    }

    async getProfile(userId: string) {
        const { data, error } = await this.supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    async updateProfile(userId: string, dto: UpdateUserDto) {
        const { full_name, username } = dto;
        const { data, error } = await this.supabase
            .from('profiles')
            .update({ full_name, username })
            .eq('id', userId);
        if (error) throw new Error(error.message);
        return data;
    }

    async deleteProfile(userId: string) {
        const { data, error } = await this.supabase
            .from('profiles')
            .delete()
            .eq('id', userId);
        if (error) throw new Error(error.message);
        return data;
    }

    /*
    Dessa vez, eu não criei métodos privados, porque as funções só fazem uma única coisa (interagir com o banco de dados).
    */

}
