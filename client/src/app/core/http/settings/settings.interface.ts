// Shared

export interface MessageOut {
  message: string;
}

// BankAccount
export interface BankAccountParams {
  search: string;
  status: string;
  page: number;
  size: number;
}

export interface BankAccount {
  date_created: Date;
  id: number;
  bank_name: string;
  bank_holder: string;
  iban: string;
  branch_code: string;
  branch_name: string;
  account_number: string;
  status: string;
}

export interface WalletBankAccountIn {
  bank_id: string;
  bank_holder: string;
  iban: string;
  branch_code: string;
  branch_name: string;
  account_number: string;
  status: string;
}

export interface WalletBankAccountOut {
  items: BankAccount[];
  total: number;
  page: number;
  size: number;
}

// Blacklist

export interface BlacklistParams {
  search: string;
  status: string;
  page: number;
  size: number;
}

export interface Blacklist {
  value: string;
  blacklist_type: string;
  status: string;
}

export interface BlacklistIn {
  value: string;
  blacklist_type: string;
  status: string;
}

export interface BlacklistOut {
  items: Blacklist[];
  total: number;
  page: number;
  size: number;
}

// Bank

export interface Bank {
  id: 0;
  date_created: Date;
  name: string;
  shortcode: string;
  status: string;
}

export interface BankOut {
  items: Bank[];
  total: number;
  size: number;
  page: number;
}

export interface Fraud {
  id: 0;
  date_created: Date;
  fraud_rule_type: string;
  param1: string;
  param2: string;
  param3: string;
  status: string;
}

export interface FraudIn {
  param1: number;
  param2: number;
  param3: number;
}

export interface FraudOut {
  items: Fraud[];
  total: number;
  size: number;
  page: number;
}

export interface BankParams {
  search: string;
  status: string;
  page: number;
  size: number;
}

export interface BankIn {
  name: string;
  shortcode: string;
  image_url: string;
  status: string;
}

// Campaign

export interface CampaignParams {
  search: string;
  status: string;
  start_date: string;
  end_date: string;
  page: number;
  size: number;
}

export interface Campaign {
  id: number;
  date_created: Date;
  title: string;
  content: string;
  image_url: string;
  detail_image_url: string;
  start_date: Date;
  end_date: Date;
  status: string;
}

export interface CampaignContentIn {
  title: string;
  content: string;
  image_url: string;
  detail_image_url: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface CampaignContentOut {
  items: Campaign[];
  total: number;
  size: number;
  page: number;
}

// Limit

export interface LimitParam {
  transaction_type: string;
  status: string;
  page: number;
  size: number;
}

export interface Limit {
  id: number;
  level_id: number;
  currency_id: number;
  transaction_type: string;
  daily: number;
  weekly: number;
  monthly: number;
  min: number;
  max: number;
  status: string;
  date_created: Date;
  date_modified: Date;
}

export interface LimitOut {
  items: Limit[];
  total: number;
  page: number;
  size: number;
}

export interface LimitIn {
  level_id: number;
  currency_id: number;
  transaction_type: string;
  daily: number;
  weekly: number;
  monthly: number;
  min: number;
  max: number;
  status: string;
}

// Level

export interface Level {
  date_created: Date;
  id: 0;
  name: string;
  type: string;
  status: string;
  wd_to_other: boolean;
}

export interface LevelOut {
  items: Level[];
  total: number;
  size: number;
  page: number;
}

export interface LevelParams {
  search: string;
  status: string;
  page: number;
  size: number;
}

export interface LevelIn {
  name: string;
  type: string;
  level_status: string;
  wd_to_other: boolean;
}

// Fees

export interface FeeParams {
  search: string;
  status: string;
  page: number;
  size: number;
}

export interface Fee {
  id: string;
  transaction_type: string;
  fee_direction_type: string;
  fee_type: string;
  fix_value: string;
  rate_value: string;
  min_value: string;
  status: string;
  level: {
    id: string;
    name: string;
    status: string;
    type: string;
  };
  currency: {
    id: string;
    code: string;
    name: string;
    flag: string;
    status: string;
  };
}

export interface FeeOut {
  items: Fee[];
  total: number;
  page: number;
  size: number;
}

export interface FeeIn {
  level_id: number;
  currency_id: number;
  transaction_type: string;
  fee_direction_type: string;
  fee_type: number;
  fix_value: number;
  rate_value: number;
  min_value: number;
  status: string;
}

// Fraud

export interface FraudParams {
  search: string;
  status: string;
  page: number;
  size: number;
}

// Currency

export interface Currency {
  id: number;
  code: string;
  name: string;
  flag: string;
  status: string;
}

export interface CurrencyParams {
  search: string;
  status: string;
  page: number;
  size: number;
}

export interface CurrencyOut {
  items: Currency[];
  total: number;
  size: number;
  page: number;
}

export interface UploadFile {
  file_type: string;
  file: any;
}

export interface UploadMessageOut {
  message: string;
  url: string;
}

export interface PosBankItem {
  id: number;
  date_created: string;
  name: string;
  shortcode: string;
  image_url: string;
  status: string;
  bank_installment: [
    {
      id: number;
      pos_bank_id: number;
      pos_bank_name: string;
      installment_name: string;
      bank_installment_count: number;
      merchant_installment_count: number;
      bank_commission: number;
      status: string;
    }
  ];
}

export interface PosBankParams {
  search: string;
  status: string;
  page: number;
  size: number;
}

export interface PosBankOut {
  items: PosBankItem[];
  total: number;
  page: number;
  size: number;
}
