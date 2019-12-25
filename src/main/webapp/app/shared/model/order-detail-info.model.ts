import { Moment } from 'moment';
import { IOrderInfo } from 'app/shared/model/order-info.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IOrderDetailInfo {
  id?: number;
  quantityOrder?: number;
  price?: number;
  orderDate?: Moment;
  amount?: number;
  orderInfo?: IOrderInfo;
  product?: IProduct;
}

export class OrderDetailInfo implements IOrderDetailInfo {
  constructor(
    public id?: number,
    public quantityOrder?: number,
    public price?: number,
    public orderDate?: Moment,
    public amount?: number,
    public orderInfo?: IOrderInfo,
    public product?: IProduct
  ) {}
}
