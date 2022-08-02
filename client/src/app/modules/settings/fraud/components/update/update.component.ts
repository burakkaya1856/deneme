import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SettingsService } from '@app/core/http';
import { AlertService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'update-fraud',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateFraudComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  public fraudData;
  updateForm: FormGroup;
  submitted = false;

  constructor(
    private bsModalRef: BsModalRef,
    private alertService: AlertService,
    private settingsService: SettingsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      param1: [this.fraudData.param1, Validators.required],
      param2: [this.fraudData.param2, Validators.required],
      param3: [this.fraudData.param3, Validators.required]
    });
  }

  get f() {
    return this.updateForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.updateForm.invalid) {
      return;
    }

    this.settingsService
      .updateFraud(this.fraudData.id, this.updateForm.value)
      .subscribe(res => {
        this.event.emit({ data: true });
        this.alertService.setNoticeHandler(res.message, 'success', false);
      });
    this.closeModal();
    this.submitted = false;
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
