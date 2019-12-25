import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IImportInfo } from 'app/shared/model/import-info.model';
import { ImportInfoService } from './import-info.service';
import { ImportInfoDeleteDialogComponent } from './import-info-delete-dialog.component';

@Component({
  selector: 'jhi-import-info',
  templateUrl: './import-info.component.html'
})
export class ImportInfoComponent implements OnInit, OnDestroy {
  importInfos: IImportInfo[];
  eventSubscriber: Subscription;

  constructor(protected importInfoService: ImportInfoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.importInfoService.query().subscribe((res: HttpResponse<IImportInfo[]>) => {
      this.importInfos = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInImportInfos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IImportInfo) {
    return item.id;
  }

  registerChangeInImportInfos() {
    this.eventSubscriber = this.eventManager.subscribe('importInfoListModification', () => this.loadAll());
  }

  delete(importInfo: IImportInfo) {
    const modalRef = this.modalService.open(ImportInfoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.importInfo = importInfo;
  }
}
