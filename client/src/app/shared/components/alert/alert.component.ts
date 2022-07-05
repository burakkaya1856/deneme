import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertService } from '../../services/index';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['alert.component.scss']
})
export class AlertComponent implements OnInit {
  public type = '';
  public message = '';
  public alertTypes = {
    warning: {
      title: 'Warning!',
      class: 'alert alert-warning'
    },
    success: {
      title: 'Success!',
      class: 'alert alert-success'
    },
    info: {
      title: 'Info!',
      class: 'alert alert-info'
    }
  };
  alerts = [];

  constructor(
    public alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.alertService.noticeSub.subscribe(notice => {
      if (this.alerts.findIndex(el => el.message === notice.message) > -1) {
        return;
      }
      const key = Math.random()
        .toString(36)
        .substring(7);
      this.alerts.push({
        message: notice.message || 'An unknown error occured.',
        type: notice.type,
        key: key
      });

      setTimeout(
        function() {
          this.close(key);
        }.bind(this),
        5000
      );
      this.changeDetectorRef.detectChanges();
    });
  }

  close(key) {
    const index = this.alerts.findIndex(el => el.key === key);
    if (index > -1) {
      this.alerts.splice(index, 1);
      this.changeDetectorRef.detectChanges();
    }
  }
}
