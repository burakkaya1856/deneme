import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantTransactionDetailComponent } from './merchant-transaction-detail.component';

describe('MerchantTransactionDetailComponent', () => {
  let component: MerchantTransactionDetailComponent;
  let fixture: ComponentFixture<MerchantTransactionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantTransactionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantTransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
