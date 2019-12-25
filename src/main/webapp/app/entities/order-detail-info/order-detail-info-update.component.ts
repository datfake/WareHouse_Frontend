import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IOrderDetailInfo, OrderDetailInfo } from 'app/shared/model/order-detail-info.model';
import { OrderDetailInfoService } from './order-detail-info.service';
import { IOrderInfo } from 'app/shared/model/order-info.model';
import { OrderInfoService } from 'app/entities/order-info/order-info.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

@Component({
  selector: 'jhi-order-detail-info-update',
  templateUrl: './order-detail-info-update.component.html'
})
export class OrderDetailInfoUpdateComponent implements OnInit {
  isSaving: boolean;

  orderinfos: IOrderInfo[];

  products: IProduct[];
  orderDateDp: any;

  editForm = this.fb.group({
    id: [],
    quantityOrder: [],
    price: [],
    orderDate: [],
    amount: [],
    orderInfo: [],
    product: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected orderDetailInfoService: OrderDetailInfoService,
    protected orderInfoService: OrderInfoService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ orderDetailInfo }) => {
      this.updateForm(orderDetailInfo);
    });
    this.orderInfoService
      .query()
      .subscribe((res: HttpResponse<IOrderInfo[]>) => (this.orderinfos = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.productService
      .query()
      .subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(orderDetailInfo: IOrderDetailInfo) {
    this.editForm.patchValue({
      id: orderDetailInfo.id,
      quantityOrder: orderDetailInfo.quantityOrder,
      price: orderDetailInfo.price,
      orderDate: orderDetailInfo.orderDate,
      amount: orderDetailInfo.amount,
      orderInfo: orderDetailInfo.orderInfo,
      product: orderDetailInfo.product
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const orderDetailInfo = this.createFromForm();
    if (orderDetailInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.orderDetailInfoService.update(orderDetailInfo));
    } else {
      this.subscribeToSaveResponse(this.orderDetailInfoService.create(orderDetailInfo));
    }
  }

  private createFromForm(): IOrderDetailInfo {
    return {
      ...new OrderDetailInfo(),
      id: this.editForm.get(['id']).value,
      quantityOrder: this.editForm.get(['quantityOrder']).value,
      price: this.editForm.get(['price']).value,
      orderDate: this.editForm.get(['orderDate']).value,
      amount: this.editForm.get(['amount']).value,
      orderInfo: this.editForm.get(['orderInfo']).value,
      product: this.editForm.get(['product']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderDetailInfo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackOrderInfoById(index: number, item: IOrderInfo) {
    return item.id;
  }

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }
}
