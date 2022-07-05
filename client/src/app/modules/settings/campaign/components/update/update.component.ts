import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'update-campaign',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateCampaignComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public statusKeys: any;
  public campaignKey: any;
  public campaignDetailKey: any;
  public contentText = '';
  public campaignData: any;
  public startDate = new Date();
  public endDate = new Date();
  public startTime = new Date();
  public endTime = new Date();
  public hourPlaceholder = this.translate.instant(
    'settings.campaign.update.hourPlaceholder'
  );
  public minutePlaceholder = this.translate.instant(
    'settings.campaign.update.minutePlaceholder'
  );
  public selectedFile: File = null;
  public id;
  public enumData;
  public detailLoadingState = false;
  public loadingState = false;

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
    this.contentText = this.campaignData.content;
    this.campaignData.start_date = new Date(this.campaignData.start_date);
    this.campaignData.end_date = new Date(this.campaignData.end_date);
    this.startTime = new Date(this.campaignData.start_date);
    this.endTime = new Date(this.campaignData.end_date);

    this.enumData.forEach(item => {
      if (item.Status) {
        this.statusKeys = Object.keys(item.Status);
      } else if (item.FileType) {
        this.campaignKey = Object.keys(item.FileType)[1];
        this.campaignDetailKey = Object.keys(item.FileType)[2];
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid && !this.loadingState && !this.detailLoadingState) {
      this.campaignData.start_date.setHours(this.startTime.getHours());
      this.campaignData.start_date.setMinutes(
        this.startTime.getMinutes() - this.startTime.getTimezoneOffset()
      );

      this.campaignData.end_date.setHours(this.endTime.getHours());
      this.campaignData.end_date.setMinutes(
        this.endTime.getMinutes() - this.endTime.getTimezoneOffset()
      );

      let startDate = this.campaignData.start_date.toISOString();
      let endDate = this.campaignData.end_date.toISOString();

      let requestData = {
        title: this.campaignData.title,
        content: this.contentText,
        image_url: this.campaignData.image_url,
        detail_image_url: this.campaignData.detail_image_url,
        start_date: startDate,
        end_date: endDate,
        status: this.campaignData.status
      };

      this.settingsService
        .updateCampaign(this.campaignData.id, requestData)
        .subscribe(res => {
          this.event.emit({ data: true });
          this.alertService.setNoticeHandler(res.message, 'success', false);
        });
      this.closeModal();
    }
  }

  campaignImageSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    let formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.loadingState = true;
    let requestData = {
      file_type: this.campaignKey,
      file: formData
    };

    this.settingsService.uploadImage(requestData).subscribe(
      res => {
        this.loadingState = false;
        this.campaignData.image_url = res.url;
      },
      err => {
        this.loadingState = false;
        const errorMessage = err.error.message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );
  }

  detailedImageSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    let formData = new FormData();
    this.detailLoadingState = true;

    formData.append('file', this.selectedFile, this.selectedFile.name);
    let requestData = {
      file_type: this.campaignKey,
      file: formData
    };

    this.settingsService.uploadImage(requestData).subscribe(
      res => {
        this.campaignData.detail_image_url = res.url;
        this.detailLoadingState = false;
      },
      err => {
        this.detailLoadingState = false;
        const errorMessage = err.error.message || err.error.detail[0].msg;
        this.alertService.setNoticeHandler(errorMessage, 'warning', true);
      }
    );
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  changeContent() {
    let text = document.getElementsByClassName('angular-editor-textarea')[0]
      .innerHTML;

    text = text.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ''); //prevent html tags to effect input data ,if user clicks on tools of the editor
    this.contentText = text;
  }
}
