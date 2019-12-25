import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IImportDetailInfo, ImportDetailInfo } from 'app/shared/model/import-detail-info.model';
import { ImportDetailInfoService } from './import-detail-info.service';
import { IImportInfo } from 'app/shared/model/import-info.model';
import { ImportInfoService } from 'app/entities/import-info/import-info.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

@Component({
  selector: 'jhi-import-detail-info-update',
  templateUrl: './import-detail-info-update.component.html'
})
export class ImportDetailInfoUpdateComponent implements OnInit {
  isSaving: boolean;

  importinfos: IImportInfo[];

  products: IProduct[];
  importDateDp: any;

  editForm = this.fb.group({
    id: [],
    quantityImport: [],
    importDate: [],
    price: [],
    importInfo: [],
    product: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected importDetailInfoService: ImportDetailInfoService,
    protected importInfoService: ImportInfoService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ importDetailInfo }) => {
      this.updateForm(importDetailInfo);
    });
    this.importInfoService
      .query()
      .subscribe(
        (res: HttpResponse<IImportInfo[]>) => (this.importinfos = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.productService
      .query()
      .subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(importDetailInfo: IImportDetailInfo) {
    this.editForm.patchValue({
      id: importDetailInfo.id,
      quantityImport: importDetailInfo.quantityImport,
      importDate: importDetailInfo.importDate,
      price: importDetailInfo.price,
      importInfo: importDetailInfo.importInfo,
      product: importDetailInfo.product
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const importDetailInfo = this.createFromForm();
    if (importDetailInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.importDetailInfoService.update(importDetailInfo));
    } else {
      this.subscribeToSaveResponse(this.importDetailInfoService.create(importDetailInfo));
    }
  }

  private createFromForm(): IImportDetailInfo {
    return {
      ...new ImportDetailInfo(),
      id: this.editForm.get(['id']).value,
      quantityImport: this.editForm.get(['quantityImport']).value,
      importDate: this.editForm.get(['importDate']).value,
      price: this.editForm.get(['price']).value,
      importInfo: this.editForm.get(['importInfo']).value,
      product: this.editForm.get(['product']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImportDetailInfo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackImportInfoById(index: number, item: IImportInfo) {
    return item.id;
  }

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }
}
