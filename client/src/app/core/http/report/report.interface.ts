export interface GetAllReserve {
  q: string;
  reserve_date: string;
  page: number;
  size: number;
}
export interface GetAllMerchantReserve {
  q: string;
  reserve_date: string;
  page: number;
  size: number;
}

export interface ReserveOut {
  items: ReserveItems[];
  total: 0;
  page: 0;
  size: 0;
}
export interface MerchantReserveOut {
  items: MerchantReserveItems[];
  total: 0;
  page: 0;
  size: 0;
}


export interface FraudOut {
  items: Fraudtems[];
  total: 0;
  page: 0;
  size: 0;
}

export interface TotalBalanceOut {
  total_balance: string;
}


export interface MerchantTotalBalanceOut {
  total_balance: string;
}

export interface ReserveIn {
  reserve_date: string;
}

interface ReserveItems {
  first_name: string;
  last_name: string;
  wallet_no: string;
  balance: string;
  calculate_date: string;
}


interface MerchantReserveItems {
  merchant: string;
  balance: string;
  calculate_date: string;
}

interface Fraudtems {
  full_name: string;
  wallet_no: string;
  fraud_rule_type: string;
  urgency: string;
  status: string;
  description: string;
}