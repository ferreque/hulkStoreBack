import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  products: any[];

  @IsString()
  @IsNotEmpty({ message: 'La provincia es requerida' })
  province: string;

  @IsString()
  @IsNotEmpty({ message: 'La localidad es requerida' })
  location: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección es requerida' })
  shippingAddress: string;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;
}
