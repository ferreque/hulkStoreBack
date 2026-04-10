import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorie, CategorieDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categorie.name) private categorieModel: Model<CategorieDocument>,
  ) {}

  async findAll() {
    const categories = await this.categorieModel
      .find({ status: true })
      .populate('user', 'name email');
    return { ok: true, categories };
  }

  async findOne(id: string) {
    const category = await this.categorieModel
      .findById(id)
      .populate('user', 'name email');
    if (!category) throw new NotFoundException('Categoría no encontrada');
    return { ok: true, category };
  }

  async create(createCategoryDto: CreateCategoryDto, user: UserDocument) {
    const category = new this.categorieModel({
      ...createCategoryDto,
      user: user._id,
    });
    await category.save();
    return { ok: true, category };
  }

  async update(id: string, updateData: Partial<CreateCategoryDto>) {
    const category = await this.categorieModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!category) throw new NotFoundException('Categoría no encontrada');
    return { ok: true, category };
  }

  async remove(id: string) {
    const category = await this.categorieModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    if (!category) throw new NotFoundException('Categoría no encontrada');
    return { ok: true, msg: 'Categoría eliminada' };
  }
}
