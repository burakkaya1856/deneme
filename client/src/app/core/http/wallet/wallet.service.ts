import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AdminWalletBankDepositOut,
  BankWithdrawOut,
  ListBankWithdraw,
  CardDepositOut,
  ListCardDeposit,
  CardWithdrawOut,
  ChangeStatusIn,
  CustomerBankAccountOut,
  CustomerDashboardOut,
  CustomerIn,
  CustomerLimitOut,
  CustomerMeOut,
  CustomerParams,
  CustomersOut,
  GetNotificationList,
  GetTransactionList,
  GetAllInvoice,
  InvoicesOut,
  ListBankDeposit,
  TransactionDetailOut,
  TransferOut,
  ListTransfer,
  TransferRequestOut,
  GetTransferRequest,
  ListCardWithdraw,
  MessageOut,
  ListDonation,
  DonationOut,
  ListManuelBalance,
  ManuelBalanceOut,
  BalanceIn
} from './wallet.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private baseUrl = 'api/admin/v1/wallet';

  constructor(private http: HttpClient) {}

  getCustomers(params?: CustomerParams): Observable<CustomersOut> {
    let options = {};
    if (params) {
      options = {
        params: new HttpParams()
          .set('search', params.search)
          .set('status', params.status)
          .set('size', params.size.toString())
          .set('page', params.page.toString())
      };
    }
    return this.http.get<CustomersOut>(this.baseUrl + '/customer/all', options);
  }

  bankWithdraws(bankWithdraw: ListBankWithdraw): Observable<BankWithdrawOut> {
    let httpParams = new HttpParams();
    Object.keys(bankWithdraw).forEach(k => {
      if (bankWithdraw[k] != null) {
        httpParams = httpParams.set(k, bankWithdraw[k]);
      }
    });
    return this.http.get<BankWithdrawOut>(this.baseUrl + '/bank-withdraw', {
      params: httpParams
    });
  }

  cardDeposits(cardDeposit: ListCardDeposit): Observable<CardDepositOut> {
    let httpParams = new HttpParams();
    Object.keys(cardDeposit).forEach(k => {
      if (cardDeposit[k] != null) {
        httpParams = httpParams.set(k, cardDeposit[k]);
      }
    });
    return this.http.get<CardDepositOut>(this.baseUrl + '/card-deposit', {
      params: httpParams
    });
  }

  getTransaction(transactionID: string): Observable<TransactionDetailOut> {
    return this.http.get<TransactionDetailOut>(
      this.baseUrl + '/transaction' + '/' + transactionID
    );
  }

  getCardWithdraw(cardWithdraw: ListCardWithdraw): Observable<CardWithdrawOut> {
    let httpParams = new HttpParams();
    Object.keys(cardWithdraw).forEach(k => {
      if (cardWithdraw[k] != null) {
        httpParams = httpParams.set(k, cardWithdraw[k]);
      }
    });
    return this.http.get<CardWithdrawOut>(this.baseUrl + '/card-withdraw/', {
      params: httpParams
    });
  }

  getBankDeposit(
    bankDeposit: ListBankDeposit
  ): Observable<AdminWalletBankDepositOut> {
    let httpParams = new HttpParams();
    Object.keys(bankDeposit).forEach(k => {
      if (bankDeposit[k] != null) {
        httpParams = httpParams.set(k, bankDeposit[k]);
      }
    });
    return this.http.get<AdminWalletBankDepositOut>(
      this.baseUrl + '/bank-deposit/',
      {
        params: httpParams
      }
    );
  }

  getMoneyRequest(
    transferRequest: GetTransferRequest
  ): Observable<TransferRequestOut> {
    let httpParams = new HttpParams();
    Object.keys(transferRequest).forEach(k => {
      if (transferRequest[k] != null) {
        httpParams = httpParams.set(k, transferRequest[k]);
      }
    });
    return this.http.get<TransferRequestOut>(
      this.baseUrl + '/transfer/request/',
      {
        params: httpParams
      }
    );
  }

  getInvoices(invoice: GetAllInvoice): Observable<InvoicesOut> {
    let httpParams = new HttpParams();
    Object.keys(invoice).forEach(k => {
      if (invoice[k] != null) {
        httpParams = httpParams.set(k, invoice[k]);
      }
    });

    return this.http.get<InvoicesOut>(this.baseUrl + '/invoice/', {
      params: httpParams
    });
  }

  getTransfers(ListTransfer: ListTransfer): Observable<TransferOut> {
    let httpParams = new HttpParams();
    Object.keys(ListTransfer).forEach(k => {
      if (ListTransfer[k] != null) {
        httpParams = httpParams.set(k, ListTransfer[k]);
      }
    });

    return this.http.get<TransferOut>(this.baseUrl + '/transfer/', {
      params: httpParams
    });
  }

  getCustomerDashboard(param: any): Observable<CustomerDashboardOut> {
    return this.http.get<CustomerDashboardOut>(
      this.baseUrl + '/customer/' + param + '/dashboard'
    );
  }

  getCustomerMe(param: any): Observable<CustomerMeOut> {
    return this.http.get<CustomerMeOut>(
      this.baseUrl + '/customer/' + param + '/me'
    );
  }

  getCustomerBank(param: any): Observable<CustomerBankAccountOut> {
    return this.http.get<CustomerBankAccountOut>(
      this.baseUrl + '/customer/' + param + '/bank'
    );
  }

  getCustomerTransactions(
    walletNo: any,
    param: GetTransactionList
  ): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(param).forEach(k => {
      if (param[k] != null) {
        httpParams = httpParams.set(k, param[k]);
      }
    });
    return this.http.get<any>(
      this.baseUrl + '/customer/' + walletNo + '/transaction',
      {
        params: httpParams
      }
    );
  }

  getCustomerNotifications(param: GetNotificationList): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + '/customer/' + param.wallet_no + '/notification',
      {
        params: new HttpParams()
          .set('page', param.page.toString())
          .set('size', param.size.toString())
      }
    );
  }

  updateCustomerProfile(
    walletNo: any,
    profileInfo: CustomerIn
  ): Observable<MessageOut> {
    return this.http.put<MessageOut>(
      this.baseUrl + '/customer/' + walletNo + '/update',
      profileInfo
    );
  }

  getCustomerLimit(walletNo: any): Observable<CustomerLimitOut> {
    return this.http.get<CustomerLimitOut>(
      this.baseUrl + '/customer/' + walletNo + '/limit'
    );
  }

  changeCustomerStatus(
    walletNo: any,
    statusInfo: ChangeStatusIn
  ): Observable<MessageOut> {
    return this.http.put<MessageOut>(
      this.baseUrl + '/customer/' + walletNo + '/change-status',
      statusInfo
    );
  }

  sendTransactionEmail(transaction_id: any): Observable<MessageOut> {
    return this.http.get<MessageOut>(
      this.baseUrl + '/transaction/email/' + transaction_id
    );
  }

  getDonationList(param: ListDonation): Observable<DonationOut> {
    let httpParams = new HttpParams();
    Object.keys(param).forEach(k => {
      if (param[k] != null) {
        httpParams = httpParams.set(k, param[k]);
      }
    });
    return this.http.get<DonationOut>(this.baseUrl + '/donation/', {
      params: httpParams
    });
  }

  getManuelBalanceList(param: ListManuelBalance): Observable<ManuelBalanceOut> {
    let httpParams = new HttpParams();
    Object.keys(param).forEach(k => {
      if (param[k] != null) {
        httpParams = httpParams.set(k, param[k]);
      }
    });
    return this.http.get<ManuelBalanceOut>(this.baseUrl + '/manuel_balance/', {
      params: httpParams
    });
  }

  addManulBalance(
    addBalance: BalanceIn,
    walletNo: any
  ): Observable<MessageOut> {
    return this.http.put<MessageOut>(
      this.baseUrl + '/customer/' + walletNo + '/add_balance',
      addBalance
    );
  }

  removeManulBalance(
    removeBalance: BalanceIn,
    walletNo: any
  ): Observable<MessageOut> {
    return this.http.put<MessageOut>(
      this.baseUrl + '/customer/' + walletNo + '/remove_balance',
      removeBalance
    );
  }
}
