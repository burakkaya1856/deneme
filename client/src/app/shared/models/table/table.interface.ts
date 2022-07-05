export interface IRecords {
  [index: number]: object;
}

export interface IMetadata {
  totalItem?: number;
  totalPage?: number;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
}

export interface ITable {
  records: IRecords;
  metadata: IMetadata;
}


