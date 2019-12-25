import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImportDetailInfo } from 'app/shared/model/import-detail-info.model';
import { ImportDetailInfoService } from './import-detail-info.service';
import { ImportDetailInfoComponent } from './import-detail-info.component';
import { ImportDetailInfoDetailComponent } from './import-detail-info-detail.component';
import { ImportDetailInfoUpdateComponent } from './import-detail-info-update.component';
import { IImportDetailInfo } from 'app/shared/model/import-detail-info.model';

@Injectable({ providedIn: 'root' })
export class ImportDetailInfoResolve implements Resolve<IImportDetailInfo> {
  constructor(private service: ImportDetailInfoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IImportDetailInfo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((importDetailInfo: HttpResponse<ImportDetailInfo>) => importDetailInfo.body));
    }
    return of(new ImportDetailInfo());
  }
}

export const importDetailInfoRoute: Routes = [
  {
    path: '',
    component: ImportDetailInfoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.importDetailInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ImportDetailInfoDetailComponent,
    resolve: {
      importDetailInfo: ImportDetailInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.importDetailInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ImportDetailInfoUpdateComponent,
    resolve: {
      importDetailInfo: ImportDetailInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.importDetailInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ImportDetailInfoUpdateComponent,
    resolve: {
      importDetailInfo: ImportDetailInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.importDetailInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
