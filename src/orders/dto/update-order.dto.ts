import { IsBoolean, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsIn(['PENDIENTE', 'ENVIADO', 'ENTREGADO'])
  status?: string;

  @IsOptional()
  @IsBoolean()
  activeOrder?: boolean;
}
