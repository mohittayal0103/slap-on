import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll(@Query('brand') brand?: string, @Query('model') model?: string) {
        if (brand && model) {
            return this.productsService.findByDevice(brand, model);
        }
        return this.productsService.findAll();
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.productsService.findBySlug(slug);
    }
}
