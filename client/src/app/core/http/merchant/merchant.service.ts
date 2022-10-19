import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private baseUrl = 'api/admin/v1/panel/merchant/';
  constructor(private http: HttpClient) {}

  getAllMerchants(merchantParams) {
    let options = {
      params: new HttpParams()
        .set('search', merchantParams.search)
        .set('page', merchantParams.page.toString())
        .set('size', merchantParams.size.toString())
    };
    return this.http.get(this.baseUrl + 'applications', options);
  }

  getMerchantDetail(merchant_id) {
    return this.http.get(this.baseUrl + 'application/' + merchant_id);
  }
}
