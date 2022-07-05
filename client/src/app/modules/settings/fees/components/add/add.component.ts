import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'add-fee',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddFeeComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public transactionTypes;
  public feeDirectionTypes = [];
  public feeTypes;
  public levels;
  public currencies;
  public statusKeys: any;
  public levelPermission = true;
  public enumData;
  public transactionKeys = [];
  public selectedTransaction = '';
  public fee = {
    level_id: 1,
    currency_id: 1,
    transaction_type: null,
    fee_direction_type: 'included',
    fee_type: null,
    fix_value: null,
    rate_value: null,
    min_value: null,
    status: 'active'
  };

  constructor(
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status).filter(key => {
          return key != 'deleted';
        });
      } else if (item.FeeType) {
        this.feeTypes = Object.keys(item.FeeType);
        this.fee.fee_type = this.feeTypes[0];
      } else if (item.TransactionType) {
        this.transactionKeys = Object.keys(item.TransactionType);
        this.fee.transaction_type = this.transactionKeys[0];
      } else if (item.FeeDirectionType) {
        this.feeDirectionTypes = Object.keys(item.FeeDirectionType);
        this.fee.fee_direction_type = this.feeDirectionTypes[0];
      }
    });

    this.settingsService.getCurrencies().subscribe(currencies => {
      this.currencies = currencies.items.map(currency => {
        currency.id = Number(currency.id);
        return currency;
      });
      this.fee.currency_id = currencies.items[0].id;
    });

    this.settingsService.getLevelList().subscribe(
      levels => {
        this.levels = levels.items;
        this.fee.level_id = levels.items[0].id;
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
      this.settingsService.addFee(this.fee).subscribe(res => {
        this.event.emit({ data: true });
        this.alertService.setNoticeHandler(res.message, 'success', false);
      });
      this.closeModal();
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
