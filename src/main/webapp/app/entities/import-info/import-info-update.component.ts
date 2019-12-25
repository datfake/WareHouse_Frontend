import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IImportInfo, ImportInfo } from 'app/shared/model/import-info.model';
import { ImportInfoService } from './import-info.service';

@Component({
  selector: 'jhi-import-info-update',
  templateUrl: './import-info-update.component.html'
})
export class ImportInfoUpdateComponent implements OnInit {
  isSaving: boolean;
  importDateDp: any;

  editForm = this.fb.group({
    id: [],
    deliverPerson: [],
    supplier: [],
    quantity: [],
    importDate: [],
    cost: []
  });

  constructor(protected importInfoService: ImportInfoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ importInfo }) => {
      this.updateForm(importInfo);
    });
  }

  updateForm(importInfo: IImportInfo) {
    this.editForm.patchValue({
      id: importInfo.id,
      deliverPerson: importInfo.deliverPerson,
      supplier: importInfo.supplier,
      quantity: importInfo.quantity,
      importDate: importInfo.importDate,
      cost: importInfo.cost
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const importInfo = this.createFromForm();
    if (importInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.importInfoService.update(importInfo));
    } else {
      this.subscribeToSaveResponse(this.importInfoService.create(importInfo));
    }
  }

  private createFromForm(): IImportInfo {
    return {
      ...new ImportInfo(),
      id: this.editForm.get(['id']).value,
      deliverPerson: this.editForm.get(['deliverPerson']).value,
      supplier: this.editForm.get(['supplier']).value,
      quantity: this.editForm.get(['quantity']).value,
      importDate: this.editForm.get(['importDate']).value,
      cost: this.editForm.get(['cost']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImportInfo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
