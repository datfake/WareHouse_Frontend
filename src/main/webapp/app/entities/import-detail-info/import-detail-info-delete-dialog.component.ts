import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImportDetailInfo } from 'app/shared/model/import-detail-info.model';
import { ImportDetailInfoService } from './import-detail-info.service';

@Component({
  templateUrl: './import-detail-info-delete-dialog.component.html'
})
export class ImportDetailInfoDeleteDialogComponent {
  importDetailInfo: IImportDetailInfo;

  constructor(
    protected importDetailInfoService: ImportDetailInfoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.importDetailInfoService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'importDetailInfoListModification',
        content: 'Deleted an importDetailInfo'
      });
      this.activeModal.dismiss(true);
    });
  }
}
