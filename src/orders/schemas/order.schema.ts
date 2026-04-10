import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: Array, required: true })
  products: any[];

  @Prop({
    type: String,
    enum: ['PENDIENTE', 'ENVIADO', 'ENTREGADO'],
    default: 'PENDIENTE',
  })
  status: string;

  @Prop({ default: true })
  activeOrder: boolean;

  @Prop({ required: true, default: 0 })
  totalPrice: number;

  @Prop({ required: true })
  province: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  shippingAddress: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};
