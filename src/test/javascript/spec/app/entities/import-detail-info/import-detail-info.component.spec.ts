import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WareHouseTestModule } from '../../../test.module';
import { ImportDetailInfoComponent } from 'app/entities/import-detail-info/import-detail-info.component';
import { ImportDetailInfoService } from 'app/entities/import-detail-info/import-detail-info.service';
import { ImportDetailInfo } from 'app/shared/model/import-detail-info.model';

describe('Component Tests', () => {
  describe('ImportDetailInfo Management Component', () => {
    let comp: ImportDetailInfoComponent;
    let fixture: ComponentFixture<ImportDetailInfoComponent>;
    let service: ImportDetailInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [ImportDetailInfoComponent],
        providers: []
      })
        .overrideTemplate(ImportDetailInfoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImportDetailInfoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImportDetailInfoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ImportDetailInfo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.importDetailInfos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
