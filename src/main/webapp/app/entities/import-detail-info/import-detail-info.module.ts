import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WareHouseSharedModule } from 'app/shared/shared.module';
import { ImportDetailInfoComponent } from './import-detail-info.component';
import { ImportDetailInfoDetailComponent } from './import-detail-info-detail.component';
import { ImportDetailInfoUpdateComponent } from './import-detail-info-update.component';
import { ImportDetailInfoDeleteDialogComponent } from './import-detail-info-delete-dialog.component';
import { importDetailInfoRoute } from './import-detail-info.route';

@NgModule({
  imports: [WareHouseSharedModule, RouterModule.forChild(importDetailInfoRoute)],
  declarations: [
    ImportDetailInfoComponent,
    ImportDetailInfoDetailComponent,
    ImportDetailInfoUpdateComponent,
    ImportDetailInfoDeleteDialogComponent
  ],
  entryComponents: [ImportDetailInfoDeleteDialogComponent]
})
export class WareHouseImportDetailInfoModule {}
