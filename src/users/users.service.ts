import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    const users = await this.userModel.find({ status: true });
    return { ok: true, users };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return { ok: true, user };
  }

  async create(createUserDto: CreateUserDto) {
    const exists = await this.userModel.findOne({ email: createUserDto.email });
    if (exists) throw new BadRequestException('El email ya está registrado');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = new this.userModel({ ...createUserDto, password: hashedPassword });
    await user.save();
    return { ok: true, user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return { ok: true, user };
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return { ok: true, msg: 'Usuario eliminado' };
  }
}
