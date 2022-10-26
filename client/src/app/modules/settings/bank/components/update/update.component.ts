import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'update-bank',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateBankComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public id: '';
  public bankData;
  public customer = null;
  public selectedFile: File = null;
  public enumData;
  public errorMessage = '';
  public imageType = '';
  public statusKeys: any;
  public choseImg = true;
  public loadingState = false;

  constructor(private bsModalRef: BsModalRef, private alertService: AlertService, private settingsService: SettingsService) {}

  ngOnInit(): void {
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
      name: this.bankData.name,
      shortcode: this.bankData.shortcode,
      image_url: this.bankData.image_url,
      status: this.bankData.status
    };
    if (form.valid && !this.loadingState) {
      this.settingsService.updateBank(this.bankData.id, requestData).subscribe(res => {
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
        this.bankData.image_url = res.url;
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
}
