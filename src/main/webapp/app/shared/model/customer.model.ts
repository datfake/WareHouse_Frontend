import { Moment } from 'moment';
import { IOrderInfo } from 'app/shared/model/order-info.model';

export interface ICustomer {
  id?: number;
  name?: string;
  birthday?: Moment;
  adress?: string;
  email?: string;
  phoneNumber?: string;
  orderInfos?: IOrderInfo[];
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public name?: string,
    public birthday?: Moment,
    public adress?: string,
    public email?: string,
    public phoneNumber?: string,
    public orderInfos?: IOrderInfo[]
  ) {}
}
