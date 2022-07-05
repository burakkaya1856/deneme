import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'add-limit',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddLimitComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public statusKeys: any;
  public enumData;
  public levels;
  public currencies;
  public transactionKeys;
  public levelPermission = true;
  public limit = {
    level_id: 0,
    currency_id: null,
    transaction_type: '',
    daily: null,
    weekly: null,
    monthly: null,
    min: null,
    max: null,
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
      } else if (item.TransactionType) {
        this.transactionKeys = Object.keys(item.TransactionType);
        this.limit.transaction_type = this.transactionKeys[0];
      }
    });

    this.settingsService.getCurrencies().subscribe(currencies => {
      this.currencies = currencies.items.map(currency => {
        currency.id = Number(currency.id);
        return currency;
      });
      this.limit.currency_id = this.currencies[0].id;
    });
    this.settingsService.getLevelList().subscribe(
      levels => {
        this.levels = levels.items;
        this.limit.level_id = this.levels[0].id;
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
      this.settingsService.addLimit(this.limit).subscribe(res => {
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
