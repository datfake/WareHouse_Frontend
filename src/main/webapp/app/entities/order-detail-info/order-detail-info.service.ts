import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrderDetailInfo } from 'app/shared/model/order-detail-info.model';

type EntityResponseType = HttpResponse<IOrderDetailInfo>;
type EntityArrayResponseType = HttpResponse<IOrderDetailInfo[]>;

@Injectable({ providedIn: 'root' })
export class OrderDetailInfoService {
  public resourceUrl = SERVER_API_URL + 'api/order-detail-infos';

  constructor(protected http: HttpClient) {}

  create(orderDetailInfo: IOrderDetailInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orderDetailInfo);
    return this.http
      .post<IOrderDetailInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(orderDetailInfo: IOrderDetailInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orderDetailInfo);
    return this.http
      .put<IOrderDetailInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrderDetailInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrderDetailInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(orderDetailInfo: IOrderDetailInfo): IOrderDetailInfo {
    const copy: IOrderDetailInfo = Object.assign({}, orderDetailInfo, {
      orderDate:
        orderDetailInfo.orderDate != null && orderDetailInfo.orderDate.isValid() ? orderDetailInfo.orderDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.orderDate = res.body.orderDate != null ? moment(res.body.orderDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((orderDetailInfo: IOrderDetailInfo) => {
        orderDetailInfo.orderDate = orderDetailInfo.orderDate != null ? moment(orderDetailInfo.orderDate) : null;
      });
    }
    return res;
  }
}
