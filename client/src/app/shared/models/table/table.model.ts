import { ITable, IMetadata } from './table.interface';

export class Table {
  public loading = false;
  public pageSizes = ['15', '30', '50', '100', '200'];

  public metadata: IMetadata = {
    page: 1,
    pageSize: 15,
    totalPage: 0,
    totalItem: 0,
    sortBy: '',
    order: ''
  };
  public records: any = [];

  public constructor(init = null) {
    Object.assign(this, init);
  }

  public setPageSize(no) {
    this.metadata.page = 1;
    this.metadata.pageSize = +no;
  }

  set data(response: ITable) {
    this.loading = false;
    this.records = response.records;
    Object.assign(this.metadata, response.metadata);
  }
}

