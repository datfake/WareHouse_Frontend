import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImportInfo } from 'app/shared/model/import-info.model';
import { ImportInfoService } from './import-info.service';
import { ImportInfoComponent } from './import-info.component';
import { ImportInfoDetailComponent } from './import-info-detail.component';
import { ImportInfoUpdateComponent } from './import-info-update.component';
import { IImportInfo } from 'app/shared/model/import-info.model';

@Injectable({ providedIn: 'root' })
export class ImportInfoResolve implements Resolve<IImportInfo> {
  constructor(private service: ImportInfoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IImportInfo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((importInfo: HttpResponse<ImportInfo>) => importInfo.body));
    }
    return of(new ImportInfo());
  }
}

export const importInfoRoute: Routes = [
  {
    path: '',
    component: ImportInfoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.importInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ImportInfoDetailComponent,
    resolve: {
      importInfo: ImportInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.importInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ImportInfoUpdateComponent,
    resolve: {
      importInfo: ImportInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.importInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ImportInfoUpdateComponent,
    resolve: {
      importInfo: ImportInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wareHouseApp.importInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
