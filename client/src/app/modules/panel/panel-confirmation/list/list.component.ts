import { Component, OnInit } from '@angular/core';
import { AuthService, PanelService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';

@Component({
  selector: 'confirmation-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public panelConfirmations: any;
  public emptyConfirmation = null;
  public isLoaded = false;
  public bsModalRef: BsModalRef;
  public paginationCount = 10;
  public pagination = {
    total: null,
    size: null,
    page: null,
    maxPage: 5
  };
  public info = {
    total: null,
    start: null,
    end: null
  };

  constructor(
    private panelService: PanelService,
    private bsModalService: BsModalService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let requestData = {
      page: 0,
      size: 10
    };
    this.panelService.panelConfirmations(requestData).subscribe(data => {
      this.panelConfirmations = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      this.pagination.page = data.page + 1;

      this.info = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };

      this.emptyConfirmation = this.panelConfirmations.length ? false : true;
    });
  }

  confirmation(confirmationData: any): void {
    this.bsModalRef = this.bsModalService.show(ConfirmationComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        confirmationData
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.getConfirmation(requestData);
    });
  }

  paginationCountHandler(event: any) {
    this.paginationCount = event;

    let paramsData = {
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = paramsData.page + 1;
    this.getConfirmation(paramsData);
  }

  paginationPageChangedHandler(event: any) {
    let paramsData = {
      page: event.page - 1,
      size: this.paginationCount
    };
    this.pagination.page = paramsData.page + 1;
    this.getConfirmation(paramsData);
  }

  getConfirmation(requestData: any) {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);
    this.panelService.panelConfirmations(requestData).subscribe(data => {
      this.panelConfirmations = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      clearTimeout(loadTimeOut);

      this.info = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };
    });
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
