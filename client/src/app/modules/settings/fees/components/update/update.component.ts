import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'update-fee',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateFeeComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public transactionKeys;
  public feeDirectionTypes;
  public feeTypes;
  public feeData: any;
  public levels;
  public currencies: any;
  public levelPermission = true;
  public enumData;
  public statusKeys: any;
  public feeTransactionType;

  constructor(
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.feeData.currency.id = parseInt(this.feeData.currency.id);

    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status);
      } else if (item.FeeType) {
        this.feeTypes = Object.keys(item.FeeType);
      } else if (item.FeeDirectionType) {
        this.feeDirectionTypes = Object.keys(item.FeeDirectionType);
      } else if (item.TransactionType) {
        this.transactionKeys = Object.keys(item.TransactionType);
        let entriest = Object.entries(item.TransactionType);
        let transactionTypes = entriest.find(item => {
          return item[1] == this.feeData.transaction_type;
        });
        this.feeData.transaction_type = transactionTypes[0];
      }
    });

    this.settingsService.getCurrencies().subscribe(currencies => {
      this.currencies = currencies.items.map(currency => {
        currency.id = Number(currency.id);

        return currency;
      });
    });

    this.settingsService.getLevelList().subscribe(
      levels => {
        this.levels = levels.items;
      },
      err => {
        this.levelPermission = err.status == 403 ? false : true;
        const errorMessage = err.error.error_message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      let requestData = {
        level_id: this.feeData.level.id,
        currency_id: this.feeData.currency.id,
        transaction_type: this.feeData.transaction_type,
        fee_direction_type: this.feeData.fee_direction_type,
        fee_type: this.feeData.fee_type,
        fix_value: this.feeData.fix_value,
        rate_value: this.feeData.rate_value,
        min_value: this.feeData.min_value,
        status: this.feeData.status
      };

      this.settingsService
        .updateFee(this.feeData.id, requestData)
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

  changeLevel(param: any) {
    this.feeData.level.id = param;
  }
}
