import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsOptional()
    @IsString()
    full_name?: string;

    @IsString()
    username: string;
}
