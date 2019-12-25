import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Brand } from 'app/shared/model/brand.model';
import { BrandService } from './brand.service';
import { BrandComponent } from './brand.component';
import { BrandDetailComponent } from './brand-detail.component';
import { BrandUpdateComponent } from './brand-update.component';
import { IBrand } from 'app/shared/model/brand.model';

@Injectable({ providedIn: 'root' })
export class BrandResolve implements Resolve<IBrand> {
  constructor(private service: BrandService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBrand> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((brand: HttpResponse<Brand>) => brand.body));
    }
    return of(new Brand());
  }
}

export const brandRoute: Routes = [
  {
    path: '',
    component: BrandComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.brand.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BrandDetailComponent,
    resolve: {
      brand: BrandResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.brand.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BrandUpdateComponent,
    resolve: {
      brand: BrandResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.brand.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BrandUpdateComponent,
    resolve: {
      brand: BrandResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.brand.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
