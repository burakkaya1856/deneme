import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService, PanelService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  public confirmationData;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    private bsModalRef: BsModalRef,
    private panelService: PanelService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    delete this.confirmationData.previous_data.id;
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  confirm(status: string) {
    this.authService.fullNameSub.subscribe(data => {
      if (this.confirmationData.submitted_by.full_name === data) {
        const message = this.translateService.instant(
          'panel.panelConfirmation.list.info'
        );
        this.alertService.setNoticeHandler(message, 'info');
        this.closeModal();
      } else if (this.confirmationData.status == 'approved') {
        this.alertService.setNoticeHandler(
          this.translateService.instant('panel.panelConfirmation.list.warning'),
          'warning',
          true
        );
        this.closeModal();
      } else {
        const requestData = {
          status
        };

        this.panelService
          .panelConfirmationCreate(this.confirmationData.id, requestData)
          .subscribe(res => {
            this.event.emit({ data: true });
            this.alertService.setNoticeHandler(res.message, 'success', true);
          });
        this.closeModal();
      }
    });
  }
}
