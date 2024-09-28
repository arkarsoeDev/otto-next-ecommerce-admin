import { Image } from "./image.interface";
import { Color } from "./color.interface";
import { Category } from "./category.interface";
import { Size } from "./size.interface";

export interface Product {
  id: string;

  storeId: string;
  categoryId: string;
  name: string;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string;
  colorId: string;
  images: Image[];

  size: Size
  color: Color
  category: Category

  createdAt: Date;
  updatedAt: Date;
}
