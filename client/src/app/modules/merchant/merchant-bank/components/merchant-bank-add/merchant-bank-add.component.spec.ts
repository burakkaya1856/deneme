import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantBankAddComponent } from './merchant-bank-add.component';

describe('MerchantBankAddComponent', () => {
  let component: MerchantBankAddComponent;
  let fixture: ComponentFixture<MerchantBankAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantBankAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantBankAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
