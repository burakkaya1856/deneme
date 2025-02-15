import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GetAllReserve,
  GetAllMerchantReserve,
  ReserveIn,
  ReserveOut,
  FraudOut,
  TotalBalanceOut,
  MerchantReserveOut,
  MerchantTotalBalanceOut
} from './report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public baseUrl = 'api/admin/v1/';

  constructor(private http: HttpClient) {}

  getReserveList(reportData: GetAllReserve): Observable<ReserveOut> {
    let options = {
      params: new HttpParams()
        .set('q', reportData.q)
        .set('reserve_date', reportData.reserve_date)
        .set('page', reportData.page.toString())
        .set('size', reportData.size.toString())
    };
    return this.http.get<ReserveOut>(this.baseUrl + 'report/reserve-list', options);
  }

  getMerchantReserveList(reportData: GetAllMerchantReserve): Observable<MerchantReserveOut> {
    let options = {
      params: new HttpParams()
        .set('q', reportData.q)
        .set('reserve_date', reportData.reserve_date)
        .set('page', reportData.page.toString())
        .set('size', reportData.size.toString())
    };
    return this.http.get<MerchantReserveOut>(this.baseUrl + 'report/reserve-merchant-list', options);
  }
  getFraudList(reportData: GetAllReserve): Observable<FraudOut> {
    let options = {
      params: new HttpParams()
        .set('q', reportData.q)
        .set('page', reportData.page.toString())
        .set('size', reportData.size.toString())
    };
    return this.http.get<FraudOut>(this.baseUrl + 'wallet/transaction/fraud', options);
  }

  getTotalReserve(param: ReserveIn): Observable<TotalBalanceOut> {
    let options = {
      params: new HttpParams().set('reserve_date', param.reserve_date)
    };
    return this.http.get<TotalBalanceOut>(
      this.baseUrl + 'report/reserve-total',
      options
    );
  }

  getMerchantTotalReserve(param: ReserveIn): Observable<MerchantTotalBalanceOut> {
    let options = {
      params: new HttpParams().set('reserve_date', param.reserve_date)
    };
    return this.http.get<TotalBalanceOut>(
      this.baseUrl + 'report/reserve-merchant-total',
      options
    );
  }
}
