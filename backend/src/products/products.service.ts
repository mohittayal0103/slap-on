import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findBySlug(slug: string): Promise<Product | null> {
        return this.productModel.findOne({ slug }).exec();
    }

    async findByDevice(brand: string, model: string): Promise<Product[]> {
        // Find products that have a variant matching the brand/model
        return this.productModel.find({
            variants: {
                $elemMatch: {
                    deviceBrand: brand,
                    deviceModel: model,
                },
            },
        }).exec();
    }
}
