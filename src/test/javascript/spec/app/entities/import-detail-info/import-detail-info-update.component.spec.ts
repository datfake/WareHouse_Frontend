import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WareHouseTestModule } from '../../../test.module';
import { ImportDetailInfoUpdateComponent } from 'app/entities/import-detail-info/import-detail-info-update.component';
import { ImportDetailInfoService } from 'app/entities/import-detail-info/import-detail-info.service';
import { ImportDetailInfo } from 'app/shared/model/import-detail-info.model';

describe('Component Tests', () => {
  describe('ImportDetailInfo Management Update Component', () => {
    let comp: ImportDetailInfoUpdateComponent;
    let fixture: ComponentFixture<ImportDetailInfoUpdateComponent>;
    let service: ImportDetailInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [ImportDetailInfoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ImportDetailInfoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImportDetailInfoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImportDetailInfoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ImportDetailInfo(123);
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
        const entity = new ImportDetailInfo();
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
