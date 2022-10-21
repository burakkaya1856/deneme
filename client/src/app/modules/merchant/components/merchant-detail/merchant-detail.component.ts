import { Component, Input, OnInit } from '@angular/core';
import { MerchantService } from '@app/core/http';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.scss']
})
export class MerchantDetailComponent implements OnInit {
  merchant!: any;
  public showCustomer: boolean = false;
  public showCompany: boolean = false;
  public showFile: boolean = false;

  constructor(private bsModalRef: BsModalRef, private merchantService: MerchantService, private translateService: TranslateService) {}

  ngOnInit(): void {
    if (this.merchant) {
      this.merchant.documents.forEach(item => {
        if (item.document_type_id == 1) {
          item.document_type_id = this.translateService.instant('merchants.update.modalTabs.thirdTab.documentType1');
        }
        if (item.document_type_id == 2) {
          item.document_type_id = this.translateService.instant('merchants.update.modalTabs.thirdTab.documentType2');
        }
      });
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  downloadFile(fileToken: string) {
    this.merchantService.getFileDownload(fileToken).subscribe((res: any) => {
      // @ts-ignore
      window.open(res.url, '_blank').focus();
    });
  }
}
