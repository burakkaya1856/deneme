import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Campaign, FraudOut, MessageOut, PosBankItem, PosBankOut, PosBankParams, UploadFile, UploadMessageOut } from './settings.interface';
import {
  Bank,
  BankAccount,
  BankAccountParams,
  BankIn,
  BankOut,
  BankParams,
  Blacklist,
  BlacklistIn,
  BlacklistOut,
  BlacklistParams,
  CampaignContentIn,
  CampaignContentOut,
  CampaignParams,
  CurrencyOut,
  CurrencyParams,
  Fee,
  FeeIn,
  FeeOut,
  FeeParams,
  FraudIn,
  FraudParams,
  Level,
  LevelIn,
  LevelOut,
  LevelParams,
  Limit,
  LimitIn,
  LimitOut,
  LimitParam,
  WalletBankAccountIn,
  WalletBankAccountOut
} from './settings.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private baseUrl = 'api/admin/v1/setting';
  constructor(private http: HttpClient) {}
  enumSub = new BehaviorSubject<any>({
    BlacklistType: {
      credit_card_number: '',
      identity_number: '',
      email_address: '',
      ip_address: '',
      phone_number: ''
    },
    ConfirmationType: {
      user_definition: '',
      user_permission_definition: '',
      wallet_bank_definition: '',
      fraud_rules: '',
      campaign_definition: ''
    },
    FeeDirectionType: {
      included: '',
      ontopof: ''
    },
    FeeType: {
      fix: 0,
      rate: 0,
      mix: 0,
      rate_with_min: 0
    },
    FileType: {
      bank: '',
      campaign: '',
      campaign_detail: '',
      document: '',
      currency: '',
      notification: ''
    },
    LevelType: {
      customer: 0,
      merchant: 1
    },
    State: {
      approved: 1,
      waiting: 0,
      declined: -1
    },
    Status: {
      active: 1,
      passive: 0,
      deleted: -1
    },
    TransactionStatus: {
      waiting: '',
      approved: '',
      declined: ''
    },
    TransactionType: {
      bank_withdrawal: '',
      bank_deposit: '',
      card_withdrawal: '',
      card_deposit: '',
      transfer: '',
      invoice: '',
      pay_in: '',
      pay_out: '',
      donation: ''
    }
  });
  // Bank Accounts

  handlerChangeEnumSubject(param: any): void {
    this.enumSub.next(param);
  }

  getBankAccounts(accountParams: BankAccountParams): Observable<WalletBankAccountOut> {
    let options = {
      params: new HttpParams()
        .set('search', accountParams.search)
        .set('status', accountParams.status)
        .set('page', accountParams.page.toString())
        .set('size', accountParams.size.toString())
    };
    return this.http.get<WalletBankAccountOut>(this.baseUrl + '/wallet_bank_account/', options);
  }

  getBankAccount(accountID: string): Observable<BankAccount> {
    return this.http.get<BankAccount>(this.baseUrl + '/wallet_bank_account/' + accountID);
  }

  createBankAccount(bankAccount: WalletBankAccountIn): Observable<MessageOut> {
    return this.http.post<MessageOut>(this.baseUrl + '/wallet_bank_account/', bankAccount);
  }

  updateBankAccount(accountID: string, requestBody: WalletBankAccountIn): Observable<MessageOut> {
    return this.http.put<MessageOut>(this.baseUrl + '/wallet_bank_account/' + accountID, requestBody);
  }

  deleteBankAccount(accountID: string): Observable<MessageOut> {
    return this.http.delete<MessageOut>(this.baseUrl + '/wallet_bank_account/' + accountID);
  }

  // Blacklist
  getBlacklist(blacklistParams: BlacklistParams): Observable<BlacklistOut> {
    let options = {
      params: new HttpParams()
        .set('search', blacklistParams.search)
        .set('status', blacklistParams.status)
        .set('page', blacklistParams.page.toString())
        .set('size', blacklistParams.size.toString())
    };
    return this.http.get<BlacklistOut>(this.baseUrl + '/blacklist/', options);
  }

  getBlacklistDetails(blacklistID: string): Observable<Blacklist> {
    return this.http.get<Blacklist>(this.baseUrl + '/blacklist/' + blacklistID);
  }

  addBlacklist(blacklist: BlacklistIn): Observable<MessageOut> {
    return this.http.post<MessageOut>(this.baseUrl + '/blacklist/', blacklist);
  }

  updateBlacklist(blacklistID: string, blacklist: BlacklistIn): Observable<MessageOut> {
    return this.http.put<MessageOut>(this.baseUrl + '/blacklist/' + blacklistID, blacklist);
  }

  deleteBlacklist(blacklistID: string): Observable<MessageOut> {
    return this.http.delete<MessageOut>(this.baseUrl + '/blacklist/' + blacklistID);
  }

  // Bank
  getBanks(bankParams?: BankParams): Observable<BankOut> {
    if (bankParams) {
      let options = {
        params: new HttpParams()
          .set('search', bankParams.search)
          .set('status', bankParams.status)
          .set('page', bankParams.page.toString())
          .set('size', bankParams.size.toString())
      };
      return this.http.get<BankOut>(this.baseUrl + '/bank/', options);
    }
    return this.http.get<BankOut>(this.baseUrl + '/bank/');
  }

  getBankDetails(bankID: string): Observable<Bank> {
    return this.http.get<Bank>(this.baseUrl + '/bank/' + bankID);
  }

  deleteBank(bankID: string): Observable<MessageOut> {
    return this.http.delete<MessageOut>(this.baseUrl + '/bank/' + bankID);
  }

  addBank(bankParams: BankIn): Observable<MessageOut> {
    return this.http.post<MessageOut>(this.baseUrl + '/bank/', bankParams);
  }

  updateBank(bankID: string, bankParams: BankIn): Observable<MessageOut> {
    return this.http.put<MessageOut>(this.baseUrl + '/bank/' + bankID, bankParams);
  }

  // Campaign
  getCampaigns(campaignParams: CampaignParams): Observable<CampaignContentOut> {
    let httpParams = new HttpParams();
    Object.keys(campaignParams).forEach(item => {
      if (campaignParams[item] != null) {
        httpParams = httpParams.set(item, campaignParams[item]);
      }
    });

    return this.http.get<CampaignContentOut>(this.baseUrl + '/campaign-content/', {
      params: httpParams
    });
  }

  getCampaign(campaignID: string): Observable<Campaign> {
    return this.http.get<Campaign>(this.baseUrl + '/campaign-content/' + campaignID);
  }

  createCampaign(campaign: CampaignContentIn): Observable<MessageOut> {
    return this.http.post<MessageOut>(this.baseUrl + '/campaign-content/', campaign);
  }

  deleteCampaign(campaignID: string): Observable<MessageOut> {
    return this.http.delete<MessageOut>(this.baseUrl + '/campaign-content/' + campaignID);
  }

  updateCampaign(campaignID: string, campaign: CampaignContentIn): Observable<MessageOut> {
    return this.http.put<MessageOut>(this.baseUrl + '/campaign-content/' + campaignID, campaign);
  }

  // Limits

  getLimitList(limitParams?: LimitParam): Observable<LimitOut> {
    let options = {
      params: new HttpParams()
        .set('transaction_type', limitParams.transaction_type)
        .set('status', limitParams.status)
        .set('size', limitParams.size.toString())
        .set('page', limitParams.page.toString())
    };
    return this.http.get<LimitOut>(this.baseUrl + '/limit/', options);
  }

  addLimit(limit: LimitIn): Observable<MessageOut> {
    return this.http.post<MessageOut>(this.baseUrl + '/limit/', limit);
  }

  getLimitDetails(limitID: string): Observable<Limit> {
    return this.http.get<Limit>(this.baseUrl + '/limit/' + limitID);
  }

  updateLimit(limitID: string, limit: LimitIn): Observable<MessageOut> {
    return this.http.put<MessageOut>(this.baseUrl + '/limit/' + limitID, limit);
  }

  deleteLimit(limitID: string): Observable<MessageOut> {
    return this.http.delete<MessageOut>(this.baseUrl + '/limit/' + limitID);
  }

  // Level

  getLevelList(levelParams?: LevelParams): Observable<LevelOut> {
    if (levelParams) {
      let options = {
        params: new HttpParams()
          .set('search', levelParams.search)
          .set('status', levelParams.status)
          .set('page', levelParams.page.toString())
          .set('size', levelParams.size.toString())
      };
      return this.http.get<LevelOut>(this.baseUrl + '/level/', options);
    }
    return this.http.get<LevelOut>(this.baseUrl + '/level/');
  }

  getLevel(levelID: string): Observable<Level> {
    return this.http.get<Level>(this.baseUrl + '/level/' + levelID);
  }

  addLevel(levelIn: LevelIn): Observable<MessageOut> {
    return this.http.post<MessageOut>(this.baseUrl + '/level/', levelIn);
  }

  updateLevel(levelID: string, levelIn: LevelIn): Observable<MessageOut> {
    return this.http.put<MessageOut>(this.baseUrl + '/level/' + levelID, levelIn);
  }

  deleteLevel(levelID: string): Observable<MessageOut> {
    return this.http.delete<MessageOut>(this.baseUrl + '/level/' + levelID);
  }

  // Fees
  getFeeList(feeParams: FeeParams): Observable<FeeOut> {
    let options = {
      params: new HttpParams()
        .set('search', feeParams.search)
        .set('status', feeParams.status)
        .set('page', feeParams.page.toString())
        .set('size', feeParams.size.toString())
    };
    return this.http.get<FeeOut>(this.baseUrl + '/fee/', options);
  }

  getFee(feeID: string): Observable<Fee> {
    return this.http.get<Fee>(this.baseUrl + '/fee/' + feeID);
  }

  addFee(fee: FeeIn): Observable<MessageOut> {
    return this.http.post<MessageOut>(this.baseUrl + '/fee/', fee);
  }

  updateFee(feeID: string, fee: FeeIn): Observable<MessageOut> {
    return this.http.put<MessageOut>(this.baseUrl + '/fee/' + feeID, fee);
  }

  deleteFee(feeID: string): Observable<MessageOut> {
    return this.http.delete<MessageOut>(this.baseUrl + '/fee/' + feeID);
  }

  // Enums
  getEnums(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/enum');
  }

  // Fraud
  getFrauds(fraudParams?: FraudParams): Observable<FraudOut> {
    if (fraudParams) {
      let options = {
        params: new HttpParams()
          .set('search', fraudParams.search)
          .set('status', fraudParams.status)
          .set('page', fraudParams.page.toString())
          .set('size', fraudParams.size.toString())
      };
      return this.http.get<FraudOut>(this.baseUrl + '/fraud/', options);
    }
    return this.http.get<FraudOut>(this.baseUrl + '/fraud/');
  }

  getFraudDetails(bankID: string): Observable<Bank> {
    return this.http.get<Bank>(this.baseUrl + '/bank/' + bankID);
  }

  updateFraud(fraudID: string, fraudParams: FraudIn): Observable<MessageOut> {
    return this.http.put<MessageOut>(this.baseUrl + '/fraud/' + fraudID, fraudParams);
  }

  // Currencies
  getCurrencies(currencyParams?: CurrencyParams): Observable<CurrencyOut> {
    if (currencyParams) {
      let options = {
        params: new HttpParams()
          .set('search', currencyParams.search)
          .set('status', currencyParams.status)
          .set('page', currencyParams.page.toString())
          .set('size', currencyParams.size.toString())
      };
      return this.http.get<CurrencyOut>(this.baseUrl + '/currency/', options);
    }
    return this.http.get<CurrencyOut>(this.baseUrl + '/currency/');
  }

  uploadImage(imageData: UploadFile): Observable<UploadMessageOut> {
    let options = {
      params: new HttpParams().set('file_type', imageData.file_type)
    };
    return this.http.post<UploadMessageOut>(this.baseUrl + '/file', imageData.file, options);
  }

  posBankList(posBankParams: PosBankParams): Observable<PosBankOut> {
    if (posBankParams.status) {
      let options = {
        params: new HttpParams()
          .set('search', posBankParams.search)
          .set('status', posBankParams.status)
          .set('page', posBankParams.page.toString())
          .set('size', posBankParams.size.toString())
      };
      return this.http.get<PosBankOut>(this.baseUrl + '/pos-bank/', options);
    } else {
      let options = {
        params: new HttpParams()
          .set('search', posBankParams.search)
          .set('page', posBankParams.page.toString())
          .set('size', posBankParams.size.toString())
      };
      return this.http.get<PosBankOut>(this.baseUrl + '/pos-bank/', options);
    }
  }

  getPosBankDetails(posBankId: string): Observable<PosBankItem> {
    return this.http.get<PosBankItem>(this.baseUrl + '/pos-bank/' + posBankId);
  }

  updatePosBank(posBankId: string, posBankData: any): Observable<MessageOut> {
    return this.http.put<MessageOut>(this.baseUrl + '/pos-bank/' + posBankId, posBankData);
  }

  deletePosBank(posBankId: string): Observable<MessageOut> {
    return this.http.delete<MessageOut>(this.baseUrl + '/pos-bank/' + posBankId);
  }

  addPosBank(posBankData: any): Observable<MessageOut> {
    return this.http.post<MessageOut>(this.baseUrl + '/pos-bank/', posBankData);
  }
}
