import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPosBankComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public selectedFile: File = null;
  public url = '../../../../../../assets/images/no-image.svg';
  public imageType = '';
  public statusKeys: any;
  public enumData;
  public choseImg = false;
  public loadingState = false;
  public posBank = {
    name: '',
    shortcode: '',
    image_url: '',
    status: 'active',
    only3d: 1,
    terminal_id: 0,
    client_id: 0
  };
  public secureChoice = [0, 1];

  constructor(private bsModalRef: BsModalRef, private alertService: AlertService, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status).filter(key => {
          return key != 'deleted';
        });
      } else if (item.FileType) {
        this.imageType = Object.keys(item.FileType)[0];
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.posBank.image_url) {
      this.settingsService.addPosBank(this.posBank).subscribe(res => {
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
    this.choseImg = true;
    let requestData = {
      file_type: this.imageType,
      file: formData
    };

    this.settingsService.uploadImage(requestData).subscribe(
      data => {
        this.url = data.url;
        this.posBank.image_url = data.url;
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
