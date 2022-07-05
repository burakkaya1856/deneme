import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GetAllReserve,
  ReserveIn,
  ReserveOut,
  TotalBalanceOut
} from './report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public baseUrl = 'api/admin/v1/report';

  constructor(private http: HttpClient) {}

  getReserveList(reportData: GetAllReserve): Observable<ReserveOut> {
    let options = {
      params: new HttpParams()
        .set('q', reportData.q)
        .set('reserve_date', reportData.reserve_date)
        .set('page', reportData.page.toString())
        .set('size', reportData.size.toString())
    };
    return this.http.get<ReserveOut>(this.baseUrl + '/reserve-list', options);
  }

  getTotalReserve(param: ReserveIn): Observable<TotalBalanceOut> {
    let options = {
      params: new HttpParams().set('reserve_date', param.reserve_date)
    };
    return this.http.get<TotalBalanceOut>(
      this.baseUrl + '/reserve-total',
      options
    );
  }
}
