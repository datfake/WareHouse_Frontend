import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderInfo } from 'app/shared/model/order-info.model';
import { OrderInfoService } from './order-info.service';
import { OrderInfoComponent } from './order-info.component';
import { OrderInfoDetailComponent } from './order-info-detail.component';
import { OrderInfoUpdateComponent } from './order-info-update.component';
import { IOrderInfo } from 'app/shared/model/order-info.model';

@Injectable({ providedIn: 'root' })
export class OrderInfoResolve implements Resolve<IOrderInfo> {
  constructor(private service: OrderInfoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrderInfo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((orderInfo: HttpResponse<OrderInfo>) => orderInfo.body));
    }
    return of(new OrderInfo());
  }
}

export const orderInfoRoute: Routes = [
  {
    path: '',
    component: OrderInfoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.orderInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrderInfoDetailComponent,
    resolve: {
      orderInfo: OrderInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.orderInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrderInfoUpdateComponent,
    resolve: {
      orderInfo: OrderInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.orderInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrderInfoUpdateComponent,
    resolve: {
      orderInfo: OrderInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.orderInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
