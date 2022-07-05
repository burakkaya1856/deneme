export interface GetAllReserve {
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

export interface TotalBalanceOut {
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
