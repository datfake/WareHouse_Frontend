import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderInfo } from 'app/shared/model/order-info.model';

@Component({
  selector: 'jhi-order-info-detail',
  templateUrl: './order-info-detail.component.html'
})
export class OrderInfoDetailComponent implements OnInit {
  orderInfo: IOrderInfo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ orderInfo }) => {
      this.orderInfo = orderInfo;
    });
  }

  previousState() {
    window.history.back();
  }
}
