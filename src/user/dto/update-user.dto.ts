import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    full_name?: string;

    @IsString()
    username: string;
}
