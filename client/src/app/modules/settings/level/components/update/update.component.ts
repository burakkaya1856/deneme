import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'update-level',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateLevelComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public titleCasePipe = new TitleCasePipe();
  public statusKeys: any;
  public enumData;
  public levelData;
  public levelType: any;
  public levelKeys: any;

  constructor(
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.levelType = this.levelData.type;

    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status);
      } else if (item.LevelType) {
        this.levelKeys = Object.keys(item.LevelType);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      let requestData = {
        name: this.levelData.name,
        type: this.levelType,
        level_status: this.levelData.status,
        wd_to_other: this.levelData.wd_to_other
      };

      this.settingsService
        .updateLevel(this.levelData.id, requestData)
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

  changeLevelType(param: any) {
    this.levelType = param;
  }
}
