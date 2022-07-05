import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'add-blacklist',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddBlacklistComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public enumData;
  public statusKeys;
  public types;
  public initialType = this.translateService.instant(
    'settings.blacklist.add.creditCardNumber'
  );
  public labelChange = '';
  public blacklist = {
    value: '',
    blacklist_type: '',
    status: 'active'
  };

  constructor(
    private bsModalRef: BsModalRef,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status).filter(key => {
          return key != 'deleted';
        });
      } else if (item.BlacklistType) {
        this.types = Object.keys(item.BlacklistType);
        this.blacklist.blacklist_type = Object.keys(item.BlacklistType)[0];
        this.labelChange = Object.keys(item.BlacklistType)[0];
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.settingsService.addBlacklist(this.blacklist).subscribe(res => {
        this.event.emit({ data: true });
        this.alertService.setNoticeHandler(res.message, 'success', false);
      });
      this.closeModal();
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  optionChange(param: any) {
    this.blacklist.blacklist_type = param;
    this.labelChange = param;
  }
}
