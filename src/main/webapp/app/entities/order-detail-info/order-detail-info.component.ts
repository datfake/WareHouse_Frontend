import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrderDetailInfo } from 'app/shared/model/order-detail-info.model';
import { OrderDetailInfoService } from './order-detail-info.service';
import { OrderDetailInfoDeleteDialogComponent } from './order-detail-info-delete-dialog.component';

@Component({
  selector: 'jhi-order-detail-info',
  templateUrl: './order-detail-info.component.html'
})
export class OrderDetailInfoComponent implements OnInit, OnDestroy {
  orderDetailInfos: IOrderDetailInfo[];
  eventSubscriber: Subscription;

  constructor(
    protected orderDetailInfoService: OrderDetailInfoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.orderDetailInfoService.query().subscribe((res: HttpResponse<IOrderDetailInfo[]>) => {
      this.orderDetailInfos = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInOrderDetailInfos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrderDetailInfo) {
    return item.id;
  }

  registerChangeInOrderDetailInfos() {
    this.eventSubscriber = this.eventManager.subscribe('orderDetailInfoListModification', () => this.loadAll());
  }

  delete(orderDetailInfo: IOrderDetailInfo) {
    const modalRef = this.modalService.open(OrderDetailInfoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.orderDetailInfo = orderDetailInfo;
  }
}
