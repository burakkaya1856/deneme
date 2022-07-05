import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WalletService } from '@app/core/http';
import { AlertService } from '@app/shared/services/alert.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { phone } from '../../../../../../../../../node_modules/phone';

@Component({
  selector: 'profile-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public formSubmmitted = false;
  public walletNo;
  public email;
  public phoneNumber;
  public phoneValidate = false;

  public userData = {
    phoneNumber: '',
    email: ''
  };
  constructor(
    public bsModalRef: BsModalRef,
    private walletService: WalletService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.userData.email = this.email;
    this.userData.phoneNumber = this.phoneNumber;
      let number = this.userData.phoneNumber.toString();
      this.phoneValidate = phone(number, { country: 'TR' }).isValid;

  }

  onSubmit(form: NgForm): void {
    this.formSubmmitted = true;

    let requestData = {
      phone_number: this.userData.phoneNumber,
      email: this.userData.email
    };

    if (form.valid && this.phoneValidate) {
      this.walletService
        .updateCustomerProfile(this.walletNo, requestData)
        .subscribe(data => {
          this.event.emit({ data: true });
          this.alertService.setNoticeHandler(data.message, 'success', false);
        });
      this.formSubmmitted = false;
      this.closeModal();
    }
  }

  phoneNumberInput(param: any) {
    this.userData.phoneNumber = param;
    if (this.userData.phoneNumber) {
      let number = this.userData.phoneNumber.toString();
      this.phoneValidate = phone(number, { country: 'TR' }).isValid;
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
