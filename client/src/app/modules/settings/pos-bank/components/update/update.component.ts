import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateBankPosComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public id: '';
  public posBankData;
  public customer = null;
  public selectedFile: File = null;
  public enumData;
  public errorMessage = '';
  public imageType = '';
  public statusKeys: any;
  public choseImg = true;
  public loadingState = false;
  public secureArray = [0, 1];
  public only3dShow: string = '';
  constructor(
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private settingsService: SettingsService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (this.posBankData.only3d) {
      this.only3dShow = this.translateService.instant('settings.posBank.update.secureStrings.active');
    } else {
      this.only3dShow = this.translateService.instant('settings.posBank.update.secureStrings.passive');
    }

    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status);
      } else if (item.FileType) {
        this.imageType = Object.keys(item.FileType)[0];
      }
    });
  }

  onSubmit(form: NgForm): void {
    let requestData = {
      name: this.posBankData.name,
      shortcode: this.posBankData.shortcode,
      image_url: this.posBankData.image_url,
      status: this.posBankData.status,
      terminal_id: 0,
      client_id: 0,
      only3d: this.posBankData.only3d
    };
    if (form.valid && !this.loadingState) {
      this.settingsService.updatePosBank(this.posBankData.id, requestData).subscribe(res => {
        this.event.emit({ data: true });
        this.alertService.setNoticeHandler(res.message, 'success', false);
      });
      this.closeModal();
    }
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    let formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.loadingState = true;
    this.choseImg = false;

    let requestData = {
      file_type: this.imageType,
      file: formData
    };

    this.settingsService.uploadImage(requestData).subscribe(
      res => {
        this.posBankData.image_url = res.url;
        this.loadingState = false;
      },
      err => {
        this.loadingState = false;
        const errorMessage = err.error.message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  changeSecure(event: any) {
    if (event) {
      this.only3dShow = this.translateService.instant('settings.posBank.update.secureStrings.active');
      this.posBankData.only3d = event;
    } else {
      this.only3dShow = this.translateService.instant('settings.posBank.update.secureStrings.passive');
      this.posBankData.only3d = event;
    }
  }
}
