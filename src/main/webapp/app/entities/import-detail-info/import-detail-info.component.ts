import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IImportDetailInfo } from 'app/shared/model/import-detail-info.model';
import { ImportDetailInfoService } from './import-detail-info.service';
import { ImportDetailInfoDeleteDialogComponent } from './import-detail-info-delete-dialog.component';

@Component({
  selector: 'jhi-import-detail-info',
  templateUrl: './import-detail-info.component.html'
})
export class ImportDetailInfoComponent implements OnInit, OnDestroy {
  importDetailInfos: IImportDetailInfo[];
  eventSubscriber: Subscription;

  constructor(
    protected importDetailInfoService: ImportDetailInfoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.importDetailInfoService.query().subscribe((res: HttpResponse<IImportDetailInfo[]>) => {
      this.importDetailInfos = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInImportDetailInfos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IImportDetailInfo) {
    return item.id;
  }

  registerChangeInImportDetailInfos() {
    this.eventSubscriber = this.eventManager.subscribe('importDetailInfoListModification', () => this.loadAll());
  }

  delete(importDetailInfo: IImportDetailInfo) {
    const modalRef = this.modalService.open(ImportDetailInfoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.importDetailInfo = importDetailInfo;
  }
}
