import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';
import { IOrderDetailInfo } from 'app/shared/model/order-detail-info.model';

export interface IOrderInfo {
  id?: number;
  amount?: number;
  orderDate?: Moment;
  customer?: ICustomer;
  orderDetailInfos?: IOrderDetailInfo[];
}

export class OrderInfo implements IOrderInfo {
  constructor(
    public id?: number,
    public amount?: number,
    public orderDate?: Moment,
    public customer?: ICustomer,
    public orderDetailInfos?: IOrderDetailInfo[]
  ) {}
}
