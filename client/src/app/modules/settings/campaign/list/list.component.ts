import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AddCampaignComponent } from '../components/add/add.component';
import { CampaignDetailsComponent } from '../components/details/details.component';
import { UpdateCampaignComponent } from '../components/update/update.component';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'campaign-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CampaignListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public campaignList = [];
  public emptyList = null;
  public campaign;
  public enumData: any;
  public pagination = {
    total: null,
    size: null,
    page: null
  };
  public maxPage = 5;
  public searchData = '';
  public statusKeys: any;
  public startDate = null;
  public endDate = null;
  public selectedStatus = null;
  public paginationCount = 10;
  public pageInfo = {
    total: null,
    start: null,
    end: null
  };
  public isLoaded = false;
  public bsRangeValue: any;

  constructor(
    public bsModalService: BsModalService,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private translate: TranslateService,
    private localeService: BsLocaleService
  ) {
    this.setDatepickerLanguage();
  }

  ngOnInit(): void {
    if (window.innerWidth <= 320) {
      this.maxPage = 3;
    }
    let campaignParams = {
      search: '',
      status: '',
      start_date: this.startDate,
      end_date: this.endDate,
      page: 0,
      size: this.paginationCount
    };
    this.settingsService.getCampaigns(campaignParams).subscribe(campaigns => {
      this.campaignList = campaigns.items;

      this.isLoaded = true;
      this.pagination = {
        total: campaigns.total,
        size: campaigns.size,
        page: campaigns.page + 1
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };
      this.emptyList = !this.campaignList.length ? true : false;
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

  setDatepickerLanguage() {
    let lang = this.translate.getDefaultLang();
    if (lang == 'tr') {
      defineLocale('tr', trLocale);
      this.localeService.use('tr');
    }
  }

  campaignDetails(id: any): void {
    this.settingsService.getCampaign(id).subscribe(campaign => {
      this.bsModalRef = this.bsModalService.show(CampaignDetailsComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          campaign
        }
      });
    });
  }

  updateCampaign(campaign): void {
    let campaignData = JSON.parse(JSON.stringify(campaign));

    this.bsModalRef = this.bsModalService.show(UpdateCampaignComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        campaignData,
        enumData: this.enumData
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: '',
        start_date: this.startDate,
        end_date: this.endDate,
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.getCampaigns(requestData);
    });
  }

  deleteCampaign(campaign): void {
    const initialState = {
      title: this.translateService.instant(
        'settings.campaign.list.delete.headerTitle'
      ),
      subtitle: this.translateService.instant(
        'settings.campaign.list.delete.title'
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
        start_date: this.startDate,
        end_date: this.endDate,
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.settingsService.deleteCampaign(campaign.id).subscribe(res => {
        this.getCampaigns(requestData);
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
    });
  }

  addCampaign(): void {
    this.bsModalRef = this.bsModalService.show(AddCampaignComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        enumData: this.enumData
      }
    });

    this.startDate = null;
    this.endDate = null;
    this.bsRangeValue = null;

    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: '',
        start_date: this.startDate,
        end_date: this.endDate,
        page: this.pagination.page - 1,
        size: this.paginationCount
      };
      this.getCampaigns(requestData);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      start_date: this.startDate,
      end_date: this.endDate,
      page: event.page - 1,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page + 1;
    this.getCampaigns(requestData);
  }

  searchCampaign(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      start_date: this.startDate,
      end_date: this.endDate,
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getCampaigns(requestData);
  }

  searchStatus(event: string): void {
    this.selectedStatus = event;

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      start_date: this.startDate,
      end_date: this.endDate,
      page: 0,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page + 1;
    this.getCampaigns(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      start_date: this.startDate,
      end_date: this.endDate,
      page: 0,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page + 1;
    this.getCampaigns(requestData);
  }

  getCampaigns(campaignParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.settingsService.getCampaigns(campaignParams).subscribe(data => {
      this.campaignList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      clearTimeout(loadTimeOut);

      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page - 1),
        end: this.pagination.size * this.pagination.page
      };
    });
  }

  searchDate(event: any) {
    let startDate = event[0];
    let endDate = event[1];

    this.startDate =
      startDate.getFullYear() +
      '-' +
      ('0' + (startDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + startDate.getDate()).slice(-2);

    this.endDate =
      endDate.getFullYear() +
      '-' +
      ('0' + (endDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + endDate.getDate()).slice(-2);

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      start_date: this.startDate,
      end_date: this.endDate,
      page: 0,
      size: this.paginationCount
    };

    this.getCampaigns(requestData);
  }

  clearDate() {
    this.startDate = null;
    this.endDate = null;
    this.bsRangeValue = null;

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      start_date: this.startDate,
      end_date: this.endDate,
      page: 0,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page + 1;
    this.getCampaigns(requestData);
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
