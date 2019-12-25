import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IOrderInfo, OrderInfo } from 'app/shared/model/order-info.model';
import { OrderInfoService } from './order-info.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';

@Component({
  selector: 'jhi-order-info-update',
  templateUrl: './order-info-update.component.html'
})
export class OrderInfoUpdateComponent implements OnInit {
  isSaving: boolean;

  customers: ICustomer[];
  orderDateDp: any;

  editForm = this.fb.group({
    id: [],
    amount: [],
    orderDate: [],
    customer: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected orderInfoService: OrderInfoService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ orderInfo }) => {
      this.updateForm(orderInfo);
    });
    this.customerService
      .query()
      .subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(orderInfo: IOrderInfo) {
    this.editForm.patchValue({
      id: orderInfo.id,
      amount: orderInfo.amount,
      orderDate: orderInfo.orderDate,
      customer: orderInfo.customer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const orderInfo = this.createFromForm();
    if (orderInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.orderInfoService.update(orderInfo));
    } else {
      this.subscribeToSaveResponse(this.orderInfoService.create(orderInfo));
    }
  }

  private createFromForm(): IOrderInfo {
    return {
      ...new OrderInfo(),
      id: this.editForm.get(['id']).value,
      amount: this.editForm.get(['amount']).value,
      orderDate: this.editForm.get(['orderDate']).value,
      customer: this.editForm.get(['customer']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderInfo>>) {
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

  trackCustomerById(index: number, item: ICustomer) {
    return item.id;
  }
}
