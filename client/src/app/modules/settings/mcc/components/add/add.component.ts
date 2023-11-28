import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'add-mcc',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddMccComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public statusKeys: any;
  public enumData;
  public mcc = {
    name: '',
    code: '',
    mcc_status: 'active'
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
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.settingsService.addMcc(this.mcc).subscribe(res => {
        this.alertService.setNoticeHandler(res.message, 'success', false);
        this.event.emit({ data: true });
      });
      this.closeModal();
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
