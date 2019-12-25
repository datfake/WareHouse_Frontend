import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WareHouseTestModule } from '../../../test.module';
import { ImportInfoUpdateComponent } from 'app/entities/import-info/import-info-update.component';
import { ImportInfoService } from 'app/entities/import-info/import-info.service';
import { ImportInfo } from 'app/shared/model/import-info.model';

describe('Component Tests', () => {
  describe('ImportInfo Management Update Component', () => {
    let comp: ImportInfoUpdateComponent;
    let fixture: ComponentFixture<ImportInfoUpdateComponent>;
    let service: ImportInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WareHouseTestModule],
        declarations: [ImportInfoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ImportInfoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImportInfoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImportInfoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ImportInfo(123);
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
        const entity = new ImportInfo();
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
