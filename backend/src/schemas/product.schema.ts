import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

class ProductVariant {
  @Prop({ required: true })
  deviceModel: string; // e.g., "DDJ-400"

  @Prop({ required: true })
  deviceBrand: string; // e.g., "Pioneer DJ"

  @Prop({ required: true })
  price: number; // e.g., 1250 (Specific price for this model)

  @Prop({ default: true })
  isInStock: boolean;
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string; // e.g. "OG Black"

  @Prop({ required: true, unique: true })
  slug: string; // e.g. "og-black"

  @Prop()
  description: string;

  @Prop({ required: true })
  type: string; // e.g. "Skin"

  @Prop([String])
  images: string[];

  @Prop([String])
  tags: string[];

  // The list of all consoles this design is available for
  @Prop([ProductVariant])
  variants: ProductVariant[];

  @Prop({ default: true })
  isListed: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
