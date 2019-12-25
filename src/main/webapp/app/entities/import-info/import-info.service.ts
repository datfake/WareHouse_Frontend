import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IImportInfo } from 'app/shared/model/import-info.model';

type EntityResponseType = HttpResponse<IImportInfo>;
type EntityArrayResponseType = HttpResponse<IImportInfo[]>;

@Injectable({ providedIn: 'root' })
export class ImportInfoService {
  public resourceUrl = SERVER_API_URL + 'api/import-infos';

  constructor(protected http: HttpClient) {}

  create(importInfo: IImportInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(importInfo);
    return this.http
      .post<IImportInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(importInfo: IImportInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(importInfo);
    return this.http
      .put<IImportInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IImportInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IImportInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(importInfo: IImportInfo): IImportInfo {
    const copy: IImportInfo = Object.assign({}, importInfo, {
      importDate: importInfo.importDate != null && importInfo.importDate.isValid() ? importInfo.importDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.importDate = res.body.importDate != null ? moment(res.body.importDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((importInfo: IImportInfo) => {
        importInfo.importDate = importInfo.importDate != null ? moment(importInfo.importDate) : null;
      });
    }
    return res;
  }
}
