import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, PanelService } from '@app/core/http';
import { AlertService } from '@app/shared/services';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public formSubmitted = false;
  public oldPassword = {
    password: '',
    show: false,
    type: 'password',
    validation: null
  };
  public newPassword = {
    password: '',
    show: false,
    type: 'password',
    validation: null
  };
  public repeatPassword = {
    password: '',
    show: false,
    type: 'password',
  };

  constructor(
    private panelService: PanelService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  submitForm(form: NgForm): void {
    this.formSubmitted = true;
    if (
      form.valid &&
      this.newPassword.password === this.repeatPassword.password &&
      this.newPassword.validation && this.oldPassword.validation
    ) {
      let requestData = {
        old_password: this.oldPassword.password,
        new_password: this.newPassword.password
      };
      this.panelService.panelUserChangePassword(requestData).subscribe(data => {
        this.alertService.setNoticeHandler(data.message, 'success', false);
        this.alertService.setNoticeHandler(
          'lütfen tekrardan giriş yapınız',
          'info',
          false
        );
        this.authService.flush();
        this.router.navigate(['/public/login']);
      });
      this.formSubmitted = false;
    }
  }

  handlerPasswordShow(param: any) {
    param.show = !param.show;
    if (param.show == true) {
      param.type = 'text';
    } else {
      param.type = 'password';
    }
  }

  changeNewPassword(param: any) {
    this.newPassword.password = param;
    this.newPassword.validation = this.newPassword.password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    );
  }

  changeOldPassword(param: any) {
    this.oldPassword.password = param;
    this.oldPassword.validation = this.oldPassword.password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    );
  }
}
