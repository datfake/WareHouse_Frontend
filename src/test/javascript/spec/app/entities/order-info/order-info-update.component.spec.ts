import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WareHouseTestModule } from '../../../test.module';
import { OrderInfoUpdateComponent } from 'app/entities/order-info/order-info-update.component';
import { OrderInfoService } from 'app/entities/order-info/order-info.service';
import { OrderInfo } from 'app/shared/model/order-info.model';

describe('Component Tests', () => {
  describe('OrderInfo Management Update Component', () => {
    let comp: OrderInfoUpdateComponent;
    let fixture: ComponentFixture<OrderInfoUpdateComponent>;
    let service: OrderInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [OrderInfoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrderInfoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderInfoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderInfoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderInfo(123);
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
        const entity = new OrderInfo();
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
