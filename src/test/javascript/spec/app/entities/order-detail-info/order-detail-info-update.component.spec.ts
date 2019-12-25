import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WareHouseTestModule } from '../../../test.module';
import { OrderDetailInfoUpdateComponent } from 'app/entities/order-detail-info/order-detail-info-update.component';
import { OrderDetailInfoService } from 'app/entities/order-detail-info/order-detail-info.service';
import { OrderDetailInfo } from 'app/shared/model/order-detail-info.model';

describe('Component Tests', () => {
  describe('OrderDetailInfo Management Update Component', () => {
    let comp: OrderDetailInfoUpdateComponent;
    let fixture: ComponentFixture<OrderDetailInfoUpdateComponent>;
    let service: OrderDetailInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [OrderDetailInfoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrderDetailInfoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderDetailInfoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderDetailInfoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderDetailInfo(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderDetailInfo();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
