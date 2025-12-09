import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductVariantDto {
  @IsString()
  deviceModel: string;

  @IsString()
  deviceBrand: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  @IsOptional()
  isInStock: boolean;
}

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  type: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];

  @IsBoolean()
  @IsOptional()
  isListed: boolean;
}
