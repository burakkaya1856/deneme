import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MerchantService, SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '@app/shared/components/modals/confirm-modal/confirm-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'update-merchant',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateMerchantComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public id;
  public merchantData;
  public showCustomer: boolean = false;
  public showCompany: boolean = false;
  public showFile: boolean = false;
  public statusArray;
  public enumData: any;
  public statusKeys: any;
  public changeNote: string = '';
  public readOnlyArray = [];
  constructor(
    private bsModalRefPopup: BsModalRef,
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private settingsService: SettingsService,
    private merchantService: MerchantService,
    private translateService: TranslateService,
    public bsModalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.enumData.forEach((item: any) => {
      if (item.State) {
        this.statusKeys = Object.keys(item.State);
      }
    });

    this.merchantService.getMerchantDetail(this.id).subscribe(merchant => {
      this.merchantData = merchant;

      this.merchantData.documents.forEach(item => {
        if (item.document_type_id == 1) {
          item.document_type_id = this.translateService.instant('merchants.update.modalTabs.thirdTab.documentType1');
        }
        if (item.document_type_id == 2) {
          item.document_type_id = this.translateService.instant('merchants.update.modalTabs.thirdTab.documentType2');
        }
        this.readOnlyArray.push(true);
      });
    });
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  firstFormSubmit(form: NgForm) {
    if (form.valid) {
      const requestData = {
        trade_name: this.merchantData.trade_name,
        email: this.merchantData.email,
        trade_registration_number: this.merchantData.trade_registration_number,
        trade_registration_office: this.merchantData.trade_registration_office,
        tax_identification_number: this.merchantData.tax_identification_number,
        tax_office: this.merchantData.tax_office,
        company_address: this.merchantData.company_address,
        company_phone_number: this.merchantData.company_phone_number,
        company_field: this.merchantData.company_field,
        reference_company: this.merchantData.reference_company,
        company_has_25_percent_share_holder: true,
        correctness_agreement: true,
        kvkk_agreement: true,
        user_agreement: true,
        contract_agreement: true,
        personal_data_agreement: true
      };
      this.merchantService.updateMerchantCustomer(this.merchantData.id, requestData).subscribe((data: any) => {
        this.event.emit({ data: true });
        this.alertService.setNoticeHandler(data.message, 'success', false);
      });
    }
  }

  secondFormSubmit(secondForm: NgForm, company: any) {
    if (secondForm.valid) {
      const { id, ...companyRest } = company;

      this.merchantService.updateMerchantOfficial(this.id, id, companyRest).subscribe((data: any) => {
        this.alertService.setNoticeHandler(data.message, 'success', false);
      });
    }
  }

  thirdFormSubmit(thirdForm: NgForm, document: any) {
    if (thirdForm.valid) {
      const documentParams = {
        id: document.id,
        status: document.status,
        note: document.value
      };

      this.merchantService.updateMerchantDocument(documentParams, document.id).subscribe((data: any) => {
        this.alertService.setNoticeHandler(data.message, 'success', false);
      });
    }
  }

  updateStatus(status: string): void {
    const initialState = {
      title: this.translateService.instant('merchants.list.confirmTitle'),
      subtitle: this.translateService.instant('merchants.list.confirmSubtitle')
    };
    this.bsModalRefPopup = this.bsModalService.show(ConfirmModalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-sm',
      initialState: initialState
    });
    this.bsModalRefPopup.content.event.subscribe(data => {
      this.merchantService.updateMerchantStatus(this.id, status).subscribe((data: any) => {
        this.merchantData.status = status;
        this.event.emit({ data: true });
        this.alertService.setNoticeHandler(data.message, 'success', false);
      });
    });
  }

  downloadFile(fileToken: string) {
    this.merchantService.getFileDownload(fileToken).subscribe((res: any) => {
      // @ts-ignore
      window.open(res.url, '_blank').focus();
    });
  }

  changeDocumentStatus($event, i: number) {
    if (this.merchantData.documents[i].status != $event) {
      this.merchantData.documents[i].status = $event;
      this.readOnlyArray[i] = false;
    }
  }
}
