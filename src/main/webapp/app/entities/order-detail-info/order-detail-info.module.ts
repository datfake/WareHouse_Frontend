import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WareHouseSharedModule } from 'app/shared/shared.module';
import { OrderDetailInfoComponent } from './order-detail-info.component';
import { OrderDetailInfoDetailComponent } from './order-detail-info-detail.component';
import { OrderDetailInfoUpdateComponent } from './order-detail-info-update.component';
import { OrderDetailInfoDeleteDialogComponent } from './order-detail-info-delete-dialog.component';
import { orderDetailInfoRoute } from './order-detail-info.route';

@NgModule({
  imports: [WareHouseSharedModule, RouterModule.forChild(orderDetailInfoRoute)],
  declarations: [
    OrderDetailInfoComponent,
    OrderDetailInfoDetailComponent,
    OrderDetailInfoUpdateComponent,
    OrderDetailInfoDeleteDialogComponent
  ],
  entryComponents: [OrderDetailInfoDeleteDialogComponent]
})
export class WareHouseOrderDetailInfoModule {}
