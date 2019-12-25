import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ImportInfoService } from 'app/entities/import-info/import-info.service';
import { IImportInfo, ImportInfo } from 'app/shared/model/import-info.model';

describe('Service Tests', () => {
  describe('ImportInfo Service', () => {
    let injector: TestBed;
    let service: ImportInfoService;
    let httpMock: HttpTestingController;
    let elemDefault: IImportInfo;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ImportInfoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ImportInfo(0, 'AAAAAAA', 'AAAAAAA', 0, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            importDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a ImportInfo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            importDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            importDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new ImportInfo(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a ImportInfo', () => {
        const returnedFromService = Object.assign(
          {
            deliverPerson: 'BBBBBB',
            supplier: 'BBBBBB',
            quantity: 1,
            importDate: currentDate.format(DATE_FORMAT),
            cost: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            importDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of ImportInfo', () => {
        const returnedFromService = Object.assign(
          {
            deliverPerson: 'BBBBBB',
            supplier: 'BBBBBB',
            quantity: 1,
            importDate: currentDate.format(DATE_FORMAT),
            cost: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            importDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ImportInfo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
