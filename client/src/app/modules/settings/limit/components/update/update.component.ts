import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'update-limit',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateLimitComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public enumData: any;
  public limitData: any;
  public transactionKeys: any;
  public levels;
  public levelPermission = true;
  public currencies;
  public statusKeys: any;

  constructor(
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.settingsService.getCurrencies().subscribe(currencies => {
      this.currencies = currencies.items.map(currency => {
        currency.id = Number(currency.id);
        return currency;
      });
      this.settingsService.getLevelList().subscribe(
        levels => {
          this.levels = levels.items;
          let level = levels.items.find(item => {
            return item.name == this.limitData.level;
          });

          this.limitData.level_id = level.id;
        },
        err => {
          this.levelPermission = err.status == 403 ? false : true;
          const errorMessage =
            err.error.error_message || err.error.detail[0].msg;
          this.alertService.setNoticeHandler(errorMessage, 'warning', true);
        }
      );

      this.enumData.forEach(item => {
        if (item.Status) {
          this.statusKeys = Object.keys(item.Status);
        } else if (item.TransactionType) {
          this.transactionKeys = Object.keys(item.TransactionType);
          this.limitData.transaction_type = this.transactionKeys.find(
            key => item.TransactionType[key] === this.limitData.transaction_type
          );
        }
      });

      let currencyId = currencies.items.find(currency => {
        return currency.name == this.limitData.currency;
      });
      this.limitData.currency_id = currencyId.id;
    });
  }

  onSubmit(form: NgForm): void {
    let requestData = {
      level_id: this.limitData.level_id,
      currency_id: this.limitData.currency_id,
      transaction_type: this.limitData.transaction_type,
      daily: this.limitData.daily,
      weekly: this.limitData.weekly,
      monthly: this.limitData.monthly,
      min: this.limitData.min,
      max: this.limitData.max,
      status: this.limitData.status
    };

    if (form.valid) {
      this.settingsService
        .updateLimit(this.limitData.id, requestData)
        .subscribe(res => {
          this.event.emit({ data: true });
          this.alertService.setNoticeHandler(res.message, 'success', false);
        });
      this.closeModal();
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  changeTransaction(param: any) {
    this.limitData.transaction_type = param;
  }

  changeLevelID(param: any) {
    this.limitData.level_id = param;
  }
}
