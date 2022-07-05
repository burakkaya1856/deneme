import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService, WalletService } from '@app/core/http';
import { AlertService } from '@app/shared/services/alert.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'dashboard-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class DashboardUpdateComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public formSubmmitted = false;
  public walletNo;
  public comment = '';
  public userStatus: any;
  public status;
  public statuses: any;
  public statusKeys: any;

  constructor(
    public bsModalRef: BsModalRef,
    private walletService: WalletService,
    private alertService: AlertService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.settingsService.enumSub.subscribe(data => {
      if (data && data.length > 0) {
        this.userStatus = this.status;
        data.find(({ Status }) => {
          if (Status) {
            this.statusKeys = Object.keys(Status);
            return;
          }
        });
      }
    });
  }

  onSubmit(form: NgForm): void {
    this.formSubmmitted = true;

    let requestData = {
      note: this.comment,
      status: this.userStatus
    };

    if (form.valid) {
      this.walletService
        .changeCustomerStatus(this.walletNo, requestData)
        .subscribe(data => {
          this.event.emit({ data: true });
          this.alertService.setNoticeHandler(data.message, 'success', false);
        });

      this.formSubmmitted = false;
      this.closeModal();
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
