import { Moment } from 'moment';
import { IImportDetailInfo } from 'app/shared/model/import-detail-info.model';

export interface IImportInfo {
  id?: number;
  deliverPerson?: string;
  supplier?: string;
  quantity?: number;
  importDate?: Moment;
  cost?: number;
  importDetailInfos?: IImportDetailInfo[];
}

export class ImportInfo implements IImportInfo {
  constructor(
    public id?: number,
    public deliverPerson?: string,
    public supplier?: string,
    public quantity?: number,
    public importDate?: Moment,
    public cost?: number,
    public importDetailInfos?: IImportDetailInfo[]
  ) {}
}
