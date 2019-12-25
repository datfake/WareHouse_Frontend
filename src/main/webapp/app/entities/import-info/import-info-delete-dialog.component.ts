import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImportInfo } from 'app/shared/model/import-info.model';
import { ImportInfoService } from './import-info.service';

@Component({
  templateUrl: './import-info-delete-dialog.component.html'
})
export class ImportInfoDeleteDialogComponent {
  importInfo: IImportInfo;

  constructor(
    protected importInfoService: ImportInfoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.importInfoService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'importInfoListModification',
        content: 'Deleted an importInfo'
      });
      this.activeModal.dismiss(true);
    });
  }
}
