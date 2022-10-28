import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private baseUrl = 'api/admin/v1/panel/merchant';
  constructor(private http: HttpClient) {}

  getAllMerchants(merchantParams) {
    if (merchantParams.status) {
      let options = {
        params: new HttpParams()
          .set('search', merchantParams.search)
          .set('application_status', merchantParams.status)
          .set('page', merchantParams.page.toString())
          .set('size', merchantParams.size.toString())
      };
    } else {
      let options = {
        params: new HttpParams()
          .set('search', merchantParams.search)
          .set('page', merchantParams.page.toString())
          .set('size', merchantParams.size.toString())
      };
      return this.http.get(this.baseUrl + '/applications', options);
    }
  }

  getMerchantDetail(merchant_id) {
    return this.http.get(this.baseUrl + '/application/' + merchant_id);
  }

  getFileDownload(document_token) {
    return this.http.get(this.baseUrl + '/application-document/' + document_token);
  }

  updateMerchantCustomer(applicationId: number, customerData: any) {
    return this.http.put(this.baseUrl + '/application/' + applicationId, customerData);
  }

  updateMerchantOfficial(applicationId: number, officialId: number, officialData) {
    return this.http.put(this.baseUrl + '/application/' + applicationId + '/official/' + officialId, officialData);
  }

  updateMerchantDocument(documentParams, documentId) {
    const options = {
      params: new HttpParams()
        .set('document_id', documentParams.id.toString())
        .set('document_status', documentParams.status)
        .set('note', documentParams.note)
    };
    return this.http.put(this.baseUrl + '/application/document/' + documentId, {}, options);
  }

  updateMerchantStatus(applicationId: number, status: string) {
    const options = {
      params: new HttpParams().set('application_status', status)
    };
    return this.http.put(this.baseUrl + '/application/' + applicationId + '/status', {}, options);
  }

  getAllMerchantTransactions(merchantTransactionsParams) {
    return this.http.get(this.baseUrl + '/all-transactions?' + this.serialize(merchantTransactionsParams));
  }

  getMerchantTransactionDetail(transaction_id) {
    return this.http.get(this.baseUrl + '/transaction/' + transaction_id);
  }

  getMerchantTransactionTypes() {
    return this.http.get(this.baseUrl + '/transaction-types');
  }

  // json to querystring
  serialize = function(obj) {
    var str = [];
    for (var p in obj)
      if (obj[p]) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  };
}
