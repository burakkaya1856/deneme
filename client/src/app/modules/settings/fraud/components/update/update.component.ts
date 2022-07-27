import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'update-fraud',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateFraudComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public id: '';
  public fraudData;
  public customer = null;
  public selectedFile: File = null;
  public enumData;
  public errorMessage = '';
  public imageType = '';
  public statusKeys: any;
  public choseImg = true;
  public loadingState = false;

  constructor(
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status);
      }
    });
  }

  onSubmit(form: NgForm): void {
    let requestData = {
      param1: this.fraudData.param1,
      param2: this.fraudData.param2,
      param3: this.fraudData.param3,
    };
    if (form.valid && !this.loadingState) {
      this.settingsService
        .updateFraud(this.fraudData.id, requestData)
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
}
