import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AddLevelComponent } from '../components/add/add.component';
import { LevelDetailsComponent } from '../components/details/details.component';
import { UpdateLevelComponent } from '../components/update/update.component';
import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'level-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class LevelListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public levelList = [];
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
    let levelParams = {
      search: '',
      status: '',
      page: 1,
      size: this.paginationCount
    };
    this.settingsService.getLevelList(levelParams).subscribe(levels => {
      this.levelList = levels.items;
      this.isLoaded = true;
      this.pagination = {
        total: levels.total,
        size: levels.size,
        page: levels.page
      };
      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page),
        end: this.pagination.size * this.pagination.page
      };
      this.emptyList = !this.levelList.length ? true : false;
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

  levelDetails(id): void {
    this.settingsService.getLevel(id).subscribe(level => {
      this.bsModalRef = this.bsModalService.show(LevelDetailsComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: { level }
      });
    });
  }

  updateLevel(level): void {
    let levelData = JSON.parse(JSON.stringify(level));
    this.bsModalRef = this.bsModalService.show(UpdateLevelComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        enumData: this.enumData,
        levelData
      }
    });

    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: '',
        page: this.pagination.page,
        size: this.paginationCount
      };
      this.settingsService.getLevelList(requestData).subscribe(levels => {
        this.levelList = levels.items;
      });
    });
  }

  deleteLevel(level): void {
    const initialState = {
      title: this.translateService.instant(
        'settings.level.list.delete.headerTitle'
      ),
      subtitle: this.translateService.instant(
        'settings.level.list.delete.title'
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
      this.settingsService.deleteLevel(level.id).subscribe(res => {
        this.getLevels(requestData);
        this.alertService.setNoticeHandler(res.message, 'success', true);
      });
    });
  }

  addLevel(): void {
    this.bsModalRef = this.bsModalService.show(AddLevelComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        enumData: this.enumData
      }
    });
    this.bsModalRef.content.event.subscribe(data => {
      let requestData = {
        search: '',
        status: '',
        page: 1,
        size: this.paginationCount
      };
      this.getLevels(requestData);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: event.page,
      size: this.paginationCount
    };

    this.pagination.page = requestData.page;
    this.getLevels(requestData);
  }

  searchLevel(event: string): void {
    this.searchData = event.trim();

    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getLevels(requestData);
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
    this.getLevels(requestData);
  }

  paginationCountChange(count: number): void {
    let requestData = {
      search: this.searchData,
      status: this.selectedStatus || '',
      page: 1,
      size: this.paginationCount
    };
    this.pagination.page = requestData.page;
    this.getLevels(requestData);
  }

  getLevels(levelParams): void {
    const loadTimeOut = setTimeout(() => {
      this.isLoaded = false;
    }, 500);

    this.settingsService.getLevelList(levelParams).subscribe(data => {
      this.levelList = data.items;
      this.isLoaded = true;
      this.pagination.total = data.total;
      this.pagination.size = data.size;
      clearTimeout(loadTimeOut);

      this.pageInfo = {
        total: this.pagination.total,
        start: this.pagination.size * (this.pagination.page),
        end: this.pagination.size * this.pagination.page
      };
    });
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
