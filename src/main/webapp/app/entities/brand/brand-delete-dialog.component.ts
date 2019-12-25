import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBrand } from 'app/shared/model/brand.model';
import { BrandService } from './brand.service';

@Component({
  templateUrl: './brand-delete-dialog.component.html'
})
export class BrandDeleteDialogComponent {
  brand: IBrand;

  constructor(protected brandService: BrandService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.brandService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'brandListModification',
        content: 'Deleted an brand'
      });
      this.activeModal.dismiss(true);
    });
  }
}
