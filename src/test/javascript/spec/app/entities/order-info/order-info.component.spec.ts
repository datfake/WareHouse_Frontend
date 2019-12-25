import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WareHouseTestModule } from '../../../test.module';
import { OrderInfoComponent } from 'app/entities/order-info/order-info.component';
import { OrderInfoService } from 'app/entities/order-info/order-info.service';
import { OrderInfo } from 'app/shared/model/order-info.model';

describe('Component Tests', () => {
  describe('OrderInfo Management Component', () => {
    let comp: OrderInfoComponent;
    let fixture: ComponentFixture<OrderInfoComponent>;
    let service: OrderInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [OrderInfoComponent],
        providers: []
      })
        .overrideTemplate(OrderInfoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderInfoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderInfoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrderInfo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.orderInfos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
