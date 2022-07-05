import { Component, OnInit } from '@angular/core';
import { WalletService } from '@app/core/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { TableDetailsModalComponent } from '@app/shared/components/table-details-modal/table-details-modal.component';
import { StorageService } from '../../../../../shared/services/storage.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public walletNo: any;
  public notificationData: any;
  public bsModalRef: BsModalRef;
  public loading = false;
  public maxPage = 5;
  public paginationCount = 10;
  public emptyNotifications = null;
  public pagination = {
    total: null,
    size: null,
    page: null
  };
  public pageInfo = {
    total: null,
    start: null,
    end: null
  };

  constructor(
    private walletService: WalletService,
    private bsModalService: BsModalService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.maxPage = 3;
    }
    this.walletNo = this.storageService.getData('wallet_no');
    let requestData = {
      wallet_no: this.walletNo,
      page: 0,
      size: this.paginationCount
    };
    this.walletService.getCustomerNotifications(requestData).subscribe(data => {
      this.notificationData = data.items;
      this.emptyNotifications = !this.notificationData.length ? true : false;

      this.pagination = {
        total: data.total,
        size: data.size,
        page: data.page + 1
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };
    });
  }

  pageChanged(event: PageChangedEvent): void {
    if (!this.loading) {
      let requestData = {
        wallet_no: this.walletNo,
        page: event.page - 1,
        size: this.paginationCount
      };

      this.pagination.page = requestData.page + 1;
      this.getNotificationList(requestData);
    }
  }

  getNotificationList(customerParams): void {
    this.loading = true;
    this.walletService
      .getCustomerNotifications(customerParams)
      .subscribe(data => {
        this.notificationData = data.items;
        this.pagination.total = data.total;
        this.pagination.size = data.size;

        this.pageInfo = {
          total: this.pagination.total,
          start: this.pagination.size * (this.pagination.page - 1),
          end: this.pagination.size * this.pagination.page
        };
        this.loading = false;
      });
  }

  detailHandler(transactionId: string) {
    this.walletService
      .getTransaction(transactionId)
      .subscribe(transactionData => {
        this.bsModalService.show(TableDetailsModalComponent, {
          initialState: { transactionData }
        });
      });
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
