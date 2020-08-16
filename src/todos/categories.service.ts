import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<void> {
    const category = new Category();
    category.name = dto.name;
    category.color = dto.color;
    await this.categoryRepository.save(category);
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<void> {
    const category = await this.categoryRepository.findOne(id);
    category.name = dto.name;
    category.color = dto.color;
    await this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
