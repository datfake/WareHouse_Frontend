import { ICategory } from 'app/shared/model/category.model';
import { IBrand } from 'app/shared/model/brand.model';

export interface IProduct {
  id?: number;
  productName?: string;
  description?: string;
  price?: number;
  quantityProduct?: number;
  category?: ICategory;
  brand?: IBrand;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public productName?: string,
    public description?: string,
    public price?: number,
    public quantityProduct?: number,
    public category?: ICategory,
    public brand?: IBrand
  ) {}
}
