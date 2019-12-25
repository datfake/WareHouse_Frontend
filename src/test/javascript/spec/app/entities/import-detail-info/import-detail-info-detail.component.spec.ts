import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WareHouseTestModule } from '../../../test.module';
import { ImportDetailInfoDetailComponent } from 'app/entities/import-detail-info/import-detail-info-detail.component';
import { ImportDetailInfo } from 'app/shared/model/import-detail-info.model';

describe('Component Tests', () => {
  describe('ImportDetailInfo Management Detail Component', () => {
    let comp: ImportDetailInfoDetailComponent;
    let fixture: ComponentFixture<ImportDetailInfoDetailComponent>;
    const route = ({ data: of({ importDetailInfo: new ImportDetailInfo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [ImportDetailInfoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ImportDetailInfoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImportDetailInfoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.importDetailInfo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
