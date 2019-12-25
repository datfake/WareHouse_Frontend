import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImportDetailInfo } from 'app/shared/model/import-detail-info.model';

@Component({
  selector: 'jhi-import-detail-info-detail',
  templateUrl: './import-detail-info-detail.component.html'
})
export class ImportDetailInfoDetailComponent implements OnInit {
  importDetailInfo: IImportDetailInfo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ importDetailInfo }) => {
      this.importDetailInfo = importDetailInfo;
    });
  }

  previousState() {
    window.history.back();
  }
}
