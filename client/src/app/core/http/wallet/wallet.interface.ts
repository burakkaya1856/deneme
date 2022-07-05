interface Customers {
  date_created: string;
  wallet_no: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  identity_number: string;
  email: string;
  status: string;
  image: string;
}

export interface CustomersOut {
  items: Customers[];
  total: number;
  page: number;
  size: number;
}

export interface CustomerParams {
  search: string;
  status: string;
  size: number;
  page: number;
}

interface BankWithdraw {
  date_created: string;
  first_name: string;
  last_name: string;
  wallet_no: string;
  amount: string;
  bank: string;
  id: string;
  status: string;
}

export interface BankWithdrawOut {
  items: BankWithdraw[];
  total: number;
  page: number;
  size: number;
}

export interface ListBankWithdraw {
  q: string;
  status: string;
  start_date: string;
  end_date: string;
  page: number;
  size: number;
}

interface CardDeposit {
  date_created: string;
  first_name: string;
  last_name: string;
  wallet_no: string;
  amount: string;
  card_holder: string;
  card_number: string;
  transaction_uuid: string;
  status: string;
}

export interface CardDepositOut {
  items: CardDeposit[];
  total: number;
  page: number;
  size: number;
}

interface TransactionType {
  code: string;
  value: string;
}

interface TransactionMainField {
  name: string;
  value: string;
}

interface TransactionDetailField {
  name: string;
  value: string;
}

export interface TransactionDetailOut {
  transaction: {
    currency: string;
    title: string;
    transaction_type: TransactionType;
    amount: 0;
    transaction_date: Date;
    status: string;
    transaction_id: string;
  };
  receipt_url: string;
  main_fields: TransactionMainField[];
  detail_fields: TransactionDetailField[];
}

interface CardWithDraw {
  date_created: string;
  first_name: string;
  last_name: string;
  wallet_no: string;
  card_number: string;
  amount: string;
  transaction_uuid: string;
  status: string;
}

export interface CardWithdrawOut {
  items: CardWithDraw[];
  total: number;
  page: number;
  size: number;
}

interface BankDeposit {
  date_created: string;
  transaction_id: string;
  first_name: string;
  last_name: string;
  bank: string;
  amount: string;
  status: string;
}

export interface AdminWalletBankDepositOut {
  items: BankDeposit[];
  total: number;
  page: number;
  size: number;
}

export interface GetTransferRequest {
  q: string;
  status: string;
  start_date: string;
  end_date: string;
  page: number;
  size: number;
}

interface TransferRequest {
  date_created: Date;
  first_name: string;
  last_name: string;
  wallet_no: string;
  receiver_phone: string;
  amount: string;
  status: string;
}

export interface TransferRequestOut {
  items: TransferRequest[];
  total: number;
  size: number;
  page: number;
}

export interface GetAllInvoice {
  q: string;
  status: string;
  start_date: string;
  end_date: string;
  page: number;
  size: number;
}

interface Invoice {
  created_date: Date;
  invoice_number: string;
  invoice_account_value: string;
  institution_name: string;
  amount: string;
  status: string;
  first_name: string;
  last_name: string;
  wallet_no: string;
  transaction_uuid: string;
}

export interface InvoicesOut {
  items: Invoice[];
  total: number;
  page: number;
  size: number;
}

export interface ListTransfer {
  q: string;
  status: string;
  start_date: string;
  end_date: string;
  page: number;
  size: number;
}

interface Transfer {
  date_created: Date;
  sender_full_name: string;
  receiver_full_name: string;
  sender_wallet_no: string;
  receiver_wallet_no: string;
  amount: string;
  transaction_uuid: string;
  status: string;
}

export interface TransferOut {
  items: Transfer[];
  total: number;
  page: number;
  size: number;
}

interface CustomerCampaignSettingOut {
  email_allowed: boolean;
  notification_allowed: boolean;
  sms_allowed: boolean;
}

export interface CustomerMeOut {
  first_name: string;
  last_name: string;
  customer_no: number;
  phone_number: string;
  email: string;
  birth_date: string;
  registration_date: string;
  identity_number: string;
  profile_image: string;
  address: string;
  customer_campaign_setting: CustomerCampaignSettingOut;
  email_verification: boolean;
  card_request: boolean;
}

interface TransactionOut {
  currency: string;
  title: string;
  transaction_type: {
    code: string;
    value: string;
  };
  amount: number;
  fee: number;
  total_amount: number;
  transaction_date: string;
  transaction_id: string;
  status: string;
}

interface AccountOut {
  id: string;
  currency_code: string;
  account_type: string;
  account_type_title: string;
  balance: number;
  flag: string;
}

interface CampaignOut {
  id: number;
  title: string;
  image_url: string;
  content: string;
  detail_image_url: string;
  start_date: string;
  end_date: string;
}

export interface CustomerDashboardOut {
  transactions: TransactionOut[];
  accounts: AccountOut[];
  number_of_notifications: number;
  campaigns: CampaignOut[];
  full_name: string;
  phone_number: string;
  customer_no: number;
  profile_image: string;
  email_verification: boolean;
  card_request: boolean;
}

export interface CustomerBankAccountOut {
  customer_bank_id: number;
  bank: string;
  bank_holder: string;
  iban: string;
  image_url: string;
}

export interface GetTransactionList {
  transaction_type: string;
  transaction_status: string;
  transaction_date: string;
  start_date: string;
  end_date: string;
  min_amount: number;
  max_amount: number;
  page: number;
  size: number;
}

export interface GetNotificationList {
  wallet_no: number;
  page: number;
  size: number;
}

export interface CustomerIn {
  phone_number: string;
  email: string;
}

export interface CustomerLimitOut {
  transaction_type: string;
  currency: string;
  min: number;
  max: number;
  limit: number;
  daily: number;
  weekly: number;
  monthly: number;
}

export interface ChangeStatusIn {
  status: number;
  note: string;
}

export interface ListBankDeposit {
  q: string;
  status: string;
  start_date: string;
  end_date: string;
  page: number;
  size: number;
}

export interface ListCardDeposit {
  q: string;
  status: string;
  start_date: string;
  end_date: string;
  page: number;
  size: number;
}

export interface ListCardWithdraw {
  q: string;
  status: string;
  start_date: string;
  end_date: string;
  page: number;
  size: number;
}

export interface ListDonation {
  q: string;
  status: string;
  start_date: string;
  end_date: string;
  page: number;
  size: number;
}

interface Donations {
  first_name: string;
  last_name: string;
  wallet_no: string;
  institution_name: string;
  amount: string;
  status: string;
  logo: string;
  transaction_uuid: string;
  created_date: string;
}

export interface DonationOut {
  items: Donations[];
  total: number;
  page: number;
  size: number;
}

export interface ListManuelBalance {
  q: string;
  page: number;
  size: number;
}

interface ManuelBalances {
  date_created: string;
  panel_user_full_name: string;
  wallet_no: string;
  customer_full_name: string;
  amount: string;
  description: string;
}

export interface ManuelBalanceOut {
  items: ManuelBalances[];
  total: number;
  page: number;
  size: number;
}

export interface BalanceIn {
  amount: number;
  currency: string;
  description: string;
}

export interface MessageOut {
  message: string;
}
