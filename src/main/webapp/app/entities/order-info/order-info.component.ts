import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrderInfo } from 'app/shared/model/order-info.model';
import { OrderInfoService } from './order-info.service';
import { OrderInfoDeleteDialogComponent } from './order-info-delete-dialog.component';

@Component({
  selector: 'jhi-order-info',
  templateUrl: './order-info.component.html'
})
export class OrderInfoComponent implements OnInit, OnDestroy {
  orderInfos: IOrderInfo[];
  eventSubscriber: Subscription;

  constructor(protected orderInfoService: OrderInfoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.orderInfoService.query().subscribe((res: HttpResponse<IOrderInfo[]>) => {
      this.orderInfos = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInOrderInfos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrderInfo) {
    return item.id;
  }

  registerChangeInOrderInfos() {
    this.eventSubscriber = this.eventManager.subscribe('orderInfoListModification', () => this.loadAll());
  }

  delete(orderInfo: IOrderInfo) {
    const modalRef = this.modalService.open(OrderInfoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.orderInfo = orderInfo;
  }
}
