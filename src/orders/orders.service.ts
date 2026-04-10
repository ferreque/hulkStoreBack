import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async findAll() {
    const orders = await this.orderModel
      .find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    return { ok: true, orders };
  }

  async findByUser(userId: string) {
    const orders = await this.orderModel
      .find({ user: userId, activeOrder: true })
      .sort({ createdAt: -1 });
    return { ok: true, orders };
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).populate('user', 'name email');
    if (!order) throw new NotFoundException('Orden no encontrada');
    return { ok: true, order };
  }

  async create(createOrderDto: CreateOrderDto, user: UserDocument) {
    const totalPrice =
      createOrderDto.totalPrice ??
      createOrderDto.products.reduce(
        (sum: number, p: any) => sum + p.price * (p.quantity ?? 1),
        0,
      );

    const order = new this.orderModel({
      ...createOrderDto,
      user: user._id,
      totalPrice,
    });
    await order.save();
    return { ok: true, order };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
      new: true,
    });
    if (!order) throw new NotFoundException('Orden no encontrada');
    return { ok: true, order };
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { activeOrder: false },
      { new: true },
    );
    if (!order) throw new NotFoundException('Orden no encontrada');
    return { ok: true, msg: 'Orden eliminada' };
  }
}
