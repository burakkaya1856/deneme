import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { AuthService } from '../../../core/http/auth/auth.service';
import { PanelService } from '../../../core/http/panel/panel.service';

@Component({
  selector: 'register-complete',
  templateUrl: './register-complete.component.html',
  styleUrls: ['./register-complete.component.scss']
})
export class RegisterCompleteComponent implements OnInit {
  public formSubmitted = false;
  public user = {
    email: '',
    verificationCode: '',
    password: {
      value: '',
      show: false,
      type: 'password',
      validation: null
    }
  };

  constructor(
    private panelService: PanelService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const user = this.authService.auth;
    if (user) {
      this.router.navigate(['/']);
    }

    this.route.queryParams.subscribe(data => {
      if (data.email_verification_code && data.email) {
        this.user.email = data.email;
        this.user.verificationCode = data.email_verification_code;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid && this.user.password.validation) {
      let requestData = {
        email: this.user.email,
        password: this.user.password.value,
        email_verification_code: this.user.verificationCode
      };

      this.panelService
        .panelUserRegisterComplete(requestData)
        .subscribe(res => {
          this.alertService.setNoticeHandler(res.message, 'success', true);
          this.router.navigate(['/login']);
        });
      this.formSubmitted = false;
    }
  }

  handlerUserPasswordShow() {
    this.user.password.show = !this.user.password.show;
    if (this.user.password.show == true) {
      this.user.password.type = 'text';
    } else {
      this.user.password.type = 'password';
    }
  }

  changePassword(event: any) {
    this.user.password.value = event;
    this.user.password.validation = this.user.password.value.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    );
  }
}
