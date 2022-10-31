import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantBankDetailComponent } from './merchant-bank-detail.component';

describe('MerchantBankDetailComponent', () => {
  let component: MerchantBankDetailComponent;
  let fixture: ComponentFixture<MerchantBankDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantBankDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantBankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
