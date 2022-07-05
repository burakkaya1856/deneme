import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'add-level',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddLevelComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public statusKeys: any;
  public levelKeys: any;
  public enumData;
  public level = {
    name: '',
    type: 'merchant',
    level_status: 'active',
    wd_to_other: true
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
      } else if (item.LevelType) {
        this.levelKeys = Object.keys(item.LevelType);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.settingsService.addLevel(this.level).subscribe(res => {
        this.alertService.setNoticeHandler(res.message, 'success', false);
        this.event.emit({ data: true });
      });
      this.closeModal();
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  changeLevelType(param: any) {
    this.level.type = param;
  }
}
