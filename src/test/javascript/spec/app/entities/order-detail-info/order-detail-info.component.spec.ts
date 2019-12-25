import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WareHouseTestModule } from '../../../test.module';
import { OrderDetailInfoComponent } from 'app/entities/order-detail-info/order-detail-info.component';
import { OrderDetailInfoService } from 'app/entities/order-detail-info/order-detail-info.service';
import { OrderDetailInfo } from 'app/shared/model/order-detail-info.model';

describe('Component Tests', () => {
  describe('OrderDetailInfo Management Component', () => {
    let comp: OrderDetailInfoComponent;
    let fixture: ComponentFixture<OrderDetailInfoComponent>;
    let service: OrderDetailInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [OrderDetailInfoComponent],
        providers: []
      })
        .overrideTemplate(OrderDetailInfoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderDetailInfoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderDetailInfoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrderDetailInfo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.orderDetailInfos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
