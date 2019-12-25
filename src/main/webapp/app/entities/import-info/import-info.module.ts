import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WareHouseSharedModule } from 'app/shared/shared.module';
import { ImportInfoComponent } from './import-info.component';
import { ImportInfoDetailComponent } from './import-info-detail.component';
import { ImportInfoUpdateComponent } from './import-info-update.component';
import { ImportInfoDeleteDialogComponent } from './import-info-delete-dialog.component';
import { importInfoRoute } from './import-info.route';

@NgModule({
  imports: [WareHouseSharedModule, RouterModule.forChild(importInfoRoute)],
  declarations: [ImportInfoComponent, ImportInfoDetailComponent, ImportInfoUpdateComponent, ImportInfoDeleteDialogComponent],
  entryComponents: [ImportInfoDeleteDialogComponent]
})
export class WareHouseImportInfoModule {}
