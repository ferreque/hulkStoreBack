import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');
    if (!user.status) throw new UnauthorizedException('Usuario inactivo');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Credenciales incorrectas');

    const token = this.jwtService.sign({ id: user._id }, { expiresIn: '8h' });

    return {
      ok: true,
      token,
      menu: this.getMenu(user.rol),
    };
  }

  async renewToken(user: UserDocument) {
    const token = this.jwtService.sign({ id: user._id }, { expiresIn: '8h' });
    return { ok: true, token, menu: this.getMenu(user.rol) };
  }

  private getMenu(rol: string) {
    const menu = [
      { title: 'Dashboard', icon: 'mdi mdi-gauge', submenu: [{ title: 'Main', url: '/' }] },
    ];
    if (rol === 'ADMIN_ROLE') {
      menu.push({
        title: 'Mantenimientos',
        icon: 'mdi mdi-folder-lock-open',
        submenu: [
          { title: 'Usuarios', url: 'usuarios' },
          { title: 'Hospitales', url: 'hospitales' },
          { title: 'Médicos', url: 'medicos' },
        ],
      });
    }
    return menu;
  }
}
