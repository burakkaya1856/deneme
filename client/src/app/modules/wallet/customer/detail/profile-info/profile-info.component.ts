import { Component, OnInit } from '@angular/core';
import { WalletService } from '@app/core/http';
import { StorageService } from '../../../../../shared/services/storage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProfileUpdateComponent } from './components/update/update.component';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  public walletNo: any;
  public profileData: any;
  public bsModalRef: BsModalRef;
  public emptyProfile = null;

  constructor(
    private walletService: WalletService,
    public bsModalService: BsModalService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.walletNo = this.storageService.getData('wallet_no');

    this.walletService.getCustomerMe(this.walletNo).subscribe(data => {
      this.profileData = data;
    });
  }

  updateProfile(walletNo): void {
    let updateData = {
      email: this.profileData.email,
      phoneNumber: this.profileData.phone_number,
      walletNo
    };
    this.bsModalRef = this.bsModalService.show(ProfileUpdateComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: updateData
    });

    this.bsModalRef.content.event.subscribe(data => {
      this.walletService.getCustomerMe(this.walletNo).subscribe(data => {
        this.profileData = data;
      });
    });
  }

  ngOnDestroy() {
    this.bsModalService.hide();
  }
}
