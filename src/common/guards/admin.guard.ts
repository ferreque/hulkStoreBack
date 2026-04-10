import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user?.rol !== 'ADMIN_ROLE') {
      throw new ForbiddenException('Se requiere rol de administrador');
    }
    return true;
  }
}
