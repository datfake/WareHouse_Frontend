import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailInfo } from 'app/shared/model/order-detail-info.model';
import { OrderDetailInfoService } from './order-detail-info.service';
import { OrderDetailInfoComponent } from './order-detail-info.component';
import { OrderDetailInfoDetailComponent } from './order-detail-info-detail.component';
import { OrderDetailInfoUpdateComponent } from './order-detail-info-update.component';
import { IOrderDetailInfo } from 'app/shared/model/order-detail-info.model';

@Injectable({ providedIn: 'root' })
export class OrderDetailInfoResolve implements Resolve<IOrderDetailInfo> {
  constructor(private service: OrderDetailInfoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrderDetailInfo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((orderDetailInfo: HttpResponse<OrderDetailInfo>) => orderDetailInfo.body));
    }
    return of(new OrderDetailInfo());
  }
}

export const orderDetailInfoRoute: Routes = [
  {
    path: '',
    component: OrderDetailInfoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.orderDetailInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrderDetailInfoDetailComponent,
    resolve: {
      orderDetailInfo: OrderDetailInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.orderDetailInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrderDetailInfoUpdateComponent,
    resolve: {
      orderDetailInfo: OrderDetailInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.orderDetailInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrderDetailInfoUpdateComponent,
    resolve: {
      orderDetailInfo: OrderDetailInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.orderDetailInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
