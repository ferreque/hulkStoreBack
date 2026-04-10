import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(category?: string) {
    const filter: any = { available: true };
    if (category) filter.categorie = category;

    const products = await this.productModel
      .find(filter)
      .populate('user', 'name email')
      .populate('categorie', 'name');
    return { ok: true, products };
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('user', 'name email')
      .populate('categorie', 'name');
    if (!product) throw new NotFoundException('Producto no encontrado');
    return { ok: true, product };
  }

  async create(createProductDto: CreateProductDto, user: UserDocument) {
    const product = new this.productModel({ ...createProductDto, user: user._id });
    await product.save();
    return { ok: true, product };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return { ok: true, product };
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { available: false },
      { new: true },
    );
    if (!product) throw new NotFoundException('Producto no encontrado');
    return { ok: true, msg: 'Producto eliminado' };
  }
}
