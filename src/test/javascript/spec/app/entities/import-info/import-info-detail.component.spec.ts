import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WareHouseTestModule } from '../../../test.module';
import { ImportInfoDetailComponent } from 'app/entities/import-info/import-info-detail.component';
import { ImportInfo } from 'app/shared/model/import-info.model';

describe('Component Tests', () => {
  describe('ImportInfo Management Detail Component', () => {
    let comp: ImportInfoDetailComponent;
    let fixture: ComponentFixture<ImportInfoDetailComponent>;
    const route = ({ data: of({ importInfo: new ImportInfo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [ImportInfoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ImportInfoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImportInfoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.importInfo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
