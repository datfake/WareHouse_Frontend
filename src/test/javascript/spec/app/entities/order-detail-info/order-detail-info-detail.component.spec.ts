import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WareHouseTestModule } from '../../../test.module';
import { OrderDetailInfoDetailComponent } from 'app/entities/order-detail-info/order-detail-info-detail.component';
import { OrderDetailInfo } from 'app/shared/model/order-detail-info.model';

describe('Component Tests', () => {
  describe('OrderDetailInfo Management Detail Component', () => {
    let comp: OrderDetailInfoDetailComponent;
    let fixture: ComponentFixture<OrderDetailInfoDetailComponent>;
    const route = ({ data: of({ orderDetailInfo: new OrderDetailInfo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [OrderDetailInfoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrderDetailInfoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderDetailInfoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.orderDetailInfo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
