import { Moment } from 'moment';
import { IImportInfo } from 'app/shared/model/import-info.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IImportDetailInfo {
  id?: number;
  quantityImport?: number;
  importDate?: Moment;
  price?: number;
  importInfo?: IImportInfo;
  product?: IProduct;
}

export class ImportDetailInfo implements IImportDetailInfo {
  constructor(
    public id?: number,
    public quantityImport?: number,
    public importDate?: Moment,
    public price?: number,
    public importInfo?: IImportInfo,
    public product?: IProduct
  ) {}
}
