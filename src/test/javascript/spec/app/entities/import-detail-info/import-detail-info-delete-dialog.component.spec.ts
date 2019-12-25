import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WareHouseTestModule } from '../../../test.module';
import { ImportDetailInfoDeleteDialogComponent } from 'app/entities/import-detail-info/import-detail-info-delete-dialog.component';
import { ImportDetailInfoService } from 'app/entities/import-detail-info/import-detail-info.service';

describe('Component Tests', () => {
  describe('ImportDetailInfo Management Delete Component', () => {
    let comp: ImportDetailInfoDeleteDialogComponent;
    let fixture: ComponentFixture<ImportDetailInfoDeleteDialogComponent>;
    let service: ImportDetailInfoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [ImportDetailInfoDeleteDialogComponent]
      })
        .overrideTemplate(ImportDetailInfoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImportDetailInfoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImportDetailInfoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
