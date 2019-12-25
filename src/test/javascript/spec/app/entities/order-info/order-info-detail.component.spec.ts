import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WareHouseTestModule } from '../../../test.module';
import { OrderInfoDetailComponent } from 'app/entities/order-info/order-info-detail.component';
import { OrderInfo } from 'app/shared/model/order-info.model';

describe('Component Tests', () => {
  describe('OrderInfo Management Detail Component', () => {
    let comp: OrderInfoDetailComponent;
    let fixture: ComponentFixture<OrderInfoDetailComponent>;
    const route = ({ data: of({ orderInfo: new OrderInfo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [OrderInfoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrderInfoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderInfoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.orderInfo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
