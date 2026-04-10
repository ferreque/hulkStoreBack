import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CategorieDocument = Categorie & Document;
/** @deprecated use CategorieDocument */
export type CategoryDocument = CategorieDocument;

// El nombre de clase 'Categorie' mantiene compatibilidad con la colección MongoDB existente
// y con el campo ref: 'Categorie' en el schema de productos
@Schema()
export class Categorie {
  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId;
}

export const CategorieSchema = SchemaFactory.createForClass(Categorie);
/** @deprecated use CategorieSchema */
export const CategorySchema = CategorieSchema;

CategorieSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};
