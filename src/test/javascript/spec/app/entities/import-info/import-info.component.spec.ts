import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WareHouseTestModule } from '../../../test.module';
import { ImportInfoComponent } from 'app/entities/import-info/import-info.component';
import { ImportInfoService } from 'app/entities/import-info/import-info.service';
import { ImportInfo } from 'app/shared/model/import-info.model';

describe('Component Tests', () => {
  describe('ImportInfo Management Component', () => {
    let comp: ImportInfoComponent;
    let fixture: ComponentFixture<ImportInfoComponent>;
    let service: ImportInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [ImportInfoComponent],
        providers: []
      })
        .overrideTemplate(ImportInfoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImportInfoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImportInfoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ImportInfo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.importInfos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
