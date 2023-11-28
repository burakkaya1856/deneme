import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mcc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class MccListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public mccList = [];
  public emptyList = null;
  public enumData: any;
  public statusKeys: any;
  public maxPage = 5;
  public searchData = '';
  public selectedStatus = null;
  public paginationCount = 10;
  public isLoaded = false;
  public pagination = {
    total: null,
    size: null,
    page: null
  };
  public pageInfo = {
    total: null,
    start: null,
    end: null
  };

  constructor(
    public bsModalService: BsModalService,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 320) {
      this.maxPage = 3;
    }
    let mccParams = {
      search: '',
      status: '',
      page: 1,
      size: this.paginationCount
    };
    this.settingsService.getMccList(mccParams).subscribe(mccs => {
      this.mccList = mccs.items;
      this.isLoaded = true;
      this.pagination = {
        total: mccs.total,
        size: mccs.size,
        page: mccs.page
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page),
        end: this.pagination.size * this.pagination.page
      };
      this.emptyList = !this.mccList.length ? true : false;
    });

    this.settingsService.enumSub.subscribe(data => {
      if (data && data.length > 0) {
        this.enumData = data;

        this.enumData.forEach(item => {
          if (item.Status) {
            this.statusKeys = Object.keys(item.Status);
          }
        });
      }
    });
  }


  deleteMcc(mcc): void {
    const initialState = {
      title: this.translateService.instant(
        'settings.mcc.list.delete.headerTitle'
      ),
      subtitle: this.translateService.instant(
        'settings.mcc.list.delete.title'
      )
    };

    this.bsModalRef = this.bsModalService.show(DeleteModalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: initialState
    });

    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: this.searchData,
        status: this.selectedStatus || '',
        page: this.pagination.page,
        size: this.paginationCount
      };
    });
  }


  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      search: this.searchData,
      page: event.page,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page;
  }

  searchMcc(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
  }

  searchStatus(event: string): void {
    this.selectedStatus = event;

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
  }


  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
