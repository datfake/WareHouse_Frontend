import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WareHouseTestModule } from '../../../test.module';
import { ImportInfoDeleteDialogComponent } from 'app/entities/import-info/import-info-delete-dialog.component';
import { ImportInfoService } from 'app/entities/import-info/import-info.service';

describe('Component Tests', () => {
  describe('ImportInfo Management Delete Component', () => {
    let comp: ImportInfoDeleteDialogComponent;
    let fixture: ComponentFixture<ImportInfoDeleteDialogComponent>;
    let service: ImportInfoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [ImportInfoDeleteDialogComponent]
      })
        .overrideTemplate(ImportInfoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImportInfoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImportInfoService);
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
