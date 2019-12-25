import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WareHouseTestModule } from '../../../test.module';
import { OrderDetailInfoDeleteDialogComponent } from 'app/entities/order-detail-info/order-detail-info-delete-dialog.component';
import { OrderDetailInfoService } from 'app/entities/order-detail-info/order-detail-info.service';

describe('Component Tests', () => {
  describe('OrderDetailInfo Management Delete Component', () => {
    let comp: OrderDetailInfoDeleteDialogComponent;
    let fixture: ComponentFixture<OrderDetailInfoDeleteDialogComponent>;
    let service: OrderDetailInfoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [OrderDetailInfoDeleteDialogComponent]
      })
        .overrideTemplate(OrderDetailInfoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderDetailInfoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderDetailInfoService);
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
