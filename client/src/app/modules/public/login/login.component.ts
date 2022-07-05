import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '@app/shared/services/storage.service';
import { AuthService } from '../../../core/http/index';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userEmail = '';
  public formSubmitted = false;
  public userPassword = {
    password: '',
    show: false,
    type: 'password',
    validation: null
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    const user = this.authService.auth;
    if (user) {
      this.router.navigate(['/']);
    }
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid && this.userPassword.validation) {
      let requestData = {
        username: this.userEmail,
        password: this.userPassword.password
      };
      this.authService.login(requestData).subscribe(data => {
        const auth = {
          token: data.access_token
        };
        this.authService.auth = auth;
        this.authService.handlerChangefullNameSub(data.full_name);
        this.storageService.setData('full_name', data.full_name);
        this.router.navigate(['/select-service']);
        this.formSubmitted = false;
      });
    }
  }

  handlerUserPasswordShow() {
    this.userPassword.show = !this.userPassword.show;
    if (this.userPassword.show == true) {
      this.userPassword.type = 'text';
    } else {
      this.userPassword.type = 'password';
    }
  }

  changePassword(event: any) {
    this.userPassword.password = event;
    this.userPassword.validation = this.userPassword.password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    );
  }
}
