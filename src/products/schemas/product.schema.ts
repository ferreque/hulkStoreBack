import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ default: 0 })
  amount: number;

  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 'https://llevatilde.es/imagetexts/0/04/vac%C3%ADa.png' })
  imagen: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Categorie', required: true })
  categorie: MongooseSchema.Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ required: true })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};
