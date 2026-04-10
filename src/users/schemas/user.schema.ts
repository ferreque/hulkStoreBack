import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  img: string;

  @Prop({ enum: ['ADMIN_ROLE', 'USER_ROLE'], default: 'USER_ROLE' })
  rol: string;

  @Prop({ default: true })
  status: boolean;

  @Prop()
  province: string;

  @Prop()
  location: string;

  @Prop()
  shippingAddress: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const { password, __v, ...data } = this.toObject();
  return data;
};
