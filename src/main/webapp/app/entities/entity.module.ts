import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'brand',
        loadChildren: () => import('./brand/brand.module').then(m => m.WareHouseBrandModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.WareHouseCategoryModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.WareHouseProductModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.WareHouseCustomerModule)
      },
      {
        path: 'import-detail-info',
        loadChildren: () => import('./import-detail-info/import-detail-info.module').then(m => m.WareHouseImportDetailInfoModule)
      },
      {
        path: 'import-info',
        loadChildren: () => import('./import-info/import-info.module').then(m => m.WareHouseImportInfoModule)
      },
      {
        path: 'order-detail-info',
        loadChildren: () => import('./order-detail-info/order-detail-info.module').then(m => m.WareHouseOrderDetailInfoModule)
      },
      {
        path: 'order-info',
        loadChildren: () => import('./order-info/order-info.module').then(m => m.WareHouseOrderInfoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class WareHouseEntityModule {}
