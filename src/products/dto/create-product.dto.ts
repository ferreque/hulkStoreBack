import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @IsNumber({}, { message: 'El precio es obligatorio' })
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsMongoId({ message: 'No es un id de categoría válido' })
  categorie: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
