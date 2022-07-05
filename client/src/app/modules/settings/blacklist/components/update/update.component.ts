import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'blacklist-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateBlacklistComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public types: any;
  public statusKeys: any;
  public labelChange = '';
  public enumData;
  public blacklistData: any;

  constructor(
    private bsModalRef: BsModalRef,
    private settingsService: SettingsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status);
      } else if (item.BlacklistType) {
        this.types = Object.keys(item.BlacklistType);
        let blacklistType = Object.entries(item.BlacklistType).find(item => {
          return item[1] == this.blacklistData.blacklist_type;
        });

        this.blacklistData.blacklist_type = blacklistType[0];
        this.labelChange = this.blacklistData.blacklist_type;
      }
    });
  }

  onSubmit(form: NgForm): void {
    let requestData = {
      value: this.blacklistData.value,
      blacklist_type: this.blacklistData.blacklist_type,
      status: this.blacklistData.status
    };

    if (form.valid) {
      this.settingsService
        .updateBlacklist(this.blacklistData.id, requestData)
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

  optionChange(param: any) {
    this.blacklistData.blacklist_type = param;
    this.labelChange = param;
  }
}
