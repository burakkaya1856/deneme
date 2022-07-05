import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/http';

@Component({
  selector: 'forgot-password',
  styleUrls: ['./forgot-password.component.scss'],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  public formSubmitted = false;

  public password: {
    old: '';
    new: '';
    repeat: '';
  };
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.auth;
    if (user) {
      this.router.navigate(['/']);
    }
  }

  submitForm(form: NgForm): void {
    this.formSubmitted = true;
  }
}
