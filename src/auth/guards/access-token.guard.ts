import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Request } from 'express';

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(private readonly supabaseService: SupabaseService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = this.getRequest(context);
        const token = this.extractTokenFromHeader(req);
        const userId = await this.getUserIdFromToken(token);
        req['userId'] = userId;
        return true;
    }

    // ===== PRIVATE METHODS =====

    private getRequest(context: ExecutionContext): Request {
        return context.switchToHttp().getRequest<Request>();
    }

    private extractTokenFromHeader(req: Request): string {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Access token missing');
        }
        return authHeader.split(' ')[1];
    }

    private async getUserIdFromToken(token: string): Promise<string> {
        const { data, error } = await this.supabaseService.getClient().auth.getUser(token);
        if (error || !data?.user) {
            throw new UnauthorizedException('Invalid access token');
        }
        return data.user.id;
    }
}
