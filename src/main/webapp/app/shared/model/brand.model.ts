import { IProduct } from 'app/shared/model/product.model';

export interface IBrand {
  id?: number;
  name?: string;
  products?: IProduct[];
}

export class Brand implements IBrand {
  constructor(public id?: number, public name?: string, public products?: IProduct[]) {}
}
