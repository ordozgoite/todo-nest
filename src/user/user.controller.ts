import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create-user')
    createProfile(@Req() req, @Body() dto: CreateUserDto) {
        const userId = req.userId;
        return this.userService.createProfile(userId, dto);
    }

    @Get('get-user')
    getProfile(@Req() req) {
        const userId = req.userId;
        return this.userService.getProfile(userId);
    }

    @Put('update-user')
    updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
        const userId = req.userId;
        return this.userService.updateProfile(userId, dto);
    }

    @Delete('delete-user')
    deleteProfile(@Req() req) {
        const userId = req.userId;
        return this.userService.deleteProfile(userId);
    }
}