import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signUp(@Body() dto: SignUpDto) {
        return this.authService.signUp(dto);
    }

    @Post('signin')
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto);
    }

    @Post('refresh')
    async refreshToken(@Body('refresh_token') refreshToken: string) {
        return this.authService.refreshAccessToken(refreshToken);
    }

}
