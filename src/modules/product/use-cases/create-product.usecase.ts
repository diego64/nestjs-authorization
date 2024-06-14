import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDTO } from '../product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../product.schema';
import { Model } from 'mongoose';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async execute(data: CreateProductDTO) {
    //Verification of the existence of the product with the same code in the database
    const productExists = await this.productModel.findOne({
      code: data.code,
    });

    //If there is a product with the same code
    if (productExists) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
    }

    //If there is no product with the same code
    const product = new this.productModel(data);
    await product.save();

    return product;
  }
}
