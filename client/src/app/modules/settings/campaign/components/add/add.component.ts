import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'add-campaign',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddCampaignComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public statusKeys: any;
  public enumData;
  public contentText = '';
  public choseImg = false;
  public loadingState = false;
  public detailChoseImg = false;
  public detailLoadingState = false;
  public startDate = new Date();
  public endDate = new Date();
  public startTime = new Date();
  public endTime = new Date();
  public hourPlaceholder = this.translate.instant(
    'settings.campaign.add.hourPlaceholder'
  );
  public minutePlaceholder = this.translate.instant(
    'settings.campaign.add.minutePlaceholder'
  );
  public campaign = {
    title: '',
    content: '',
    image_url: '',
    detail_image_url: '',
    start_date: '',
    end_date: '',
    status: 'active'
  };
  public campaignKey: any;
  public campaignDetailKey: any;
  public campaignImage = '../../../../../../assets/images/no-image.svg';
  public detailImage = '../../../../../../assets/images/no-image.svg';
  public selectedFile: File = null;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '200px',
    width: 'auto',
    translate: 'no',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    toolbarHiddenButtons: [
      ['undo', 'redo', 'strikeThrough', 'subscript', 'superscript', 'fontName']
    ],
    outline: false,
    sanitize: true,
    toolbarPosition: 'top'
  };

  setDatepickerLanguage() {
    let lang = this.translate.getDefaultLang();
    if (lang == 'tr') {
      defineLocale('tr', trLocale);
      this.localeService.use('tr');
    }
  }

  constructor(
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private settingsService: SettingsService,
    private localeService: BsLocaleService,
    private translate: TranslateService
  ) {
    this.setDatepickerLanguage();
  }

  ngOnInit(): void {
    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status).filter(key => {
          return key != 'deleted';
        });
      } else if (item.FileType) {
        this.campaignKey = Object.keys(item.FileType)[1];
        this.campaignDetailKey = Object.keys(item.FileType)[2];
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (
      form.valid &&
      this.campaign.image_url &&
      this.campaign.detail_image_url
    ) {
      this.startDate.setHours(this.startTime.getHours());
      this.startDate.setMinutes(
        this.startTime.getMinutes() - this.startTime.getTimezoneOffset()
      );

      this.endDate.setHours(this.endTime.getHours());
      this.endDate.setMinutes(
        this.endTime.getMinutes() - this.endTime.getTimezoneOffset()
      );

      let requestData = {
        title: this.campaign.title,
        content: this.contentText,
        image_url: this.campaign.image_url,
        detail_image_url: this.campaign.detail_image_url,
        start_date: this.startDate.toISOString(),
        end_date: this.endDate.toISOString(),
        status: this.campaign.status
      };
      this.settingsService.createCampaign(requestData).subscribe(res => {
        this.event.emit({ data: true });
        this.alertService.setNoticeHandler(res.message, 'success', false);
      });
      this.closeModal();
    }
  }

  detailImageSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    let formData = new FormData();
    this.detailLoadingState = true;
    this.detailChoseImg = true;
    formData.append('file', this.selectedFile, this.selectedFile.name);
    let requestData = {
      file_type: this.campaignKey,
      file: formData
    };

    this.settingsService.uploadImage(requestData).subscribe(
      res => {
        this.campaign.detail_image_url = res.url;
        this.detailImage = res.url;
        this.detailLoadingState = false;
      },
      err => {
        this.detailLoadingState = false;
        const errorMessage = err.error.message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );
  }

  campaignImageSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    let formData = new FormData();
    this.loadingState = true;
    this.choseImg = true;
    formData.append('file', this.selectedFile, this.selectedFile.name);
    let requestData = {
      file_type: this.campaignKey,
      file: formData
    };

    this.settingsService.uploadImage(requestData).subscribe(
      res => {
        this.campaign.image_url = res.url;
        this.campaignImage = res.url;
        this.loadingState = false;
      },
      err => {
        this.loadingState = false;
        const errorMessage = err.error.message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );
  }

  changeContent() {
    let text = document.getElementsByClassName('angular-editor-textarea')[0]
      .innerHTML;

    text = text.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ''); //prevent html tags to effect input data ,if user clicks on tools of the editor

    this.contentText = text;
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
