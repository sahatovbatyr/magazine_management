import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class SwaggerGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      // const payload = await this.authService.getPayload(request);
      //
      // const allowedRoles = [RolesEnum.ADMIN.toString()];
      // const hasAccess = payload.roles.some((role) => allowedRoles.includes(role.title));
      //
      // if (!hasAccess) {
      //   throw new UnauthorizedException('Access to Swagger UI is restricted to admins');
      // }

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or missing JWT token');
    }
  }
}