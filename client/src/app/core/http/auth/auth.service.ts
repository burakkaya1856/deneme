import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../../../shared/services/storage.service';
import { Login, LoginOut } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'api/admin/v1/auth';
  public isAuthorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  fullNameSub = new BehaviorSubject('');

  constructor(
    @Inject('systemConfig') public SystemConfig,
    private permissionsService: NgxPermissionsService,
    private storageService: StorageService,
    private router: Router,
    protected http: HttpClient
  ) {}

  authCheck() {
    const user = this.storageService.getData('user');

    if (!user) {
      this.isAuthorized$.next(false);
    } else {
      if (user.roles && user.roles.length) {
        this.permissionsService.addPermission(user.roles);
      }
      this.isAuthorized$.next(true);
    }
  }

  flush() {
    this.isAuthorized$.next(false);
    this.storageService.flush('user');
    this.storageService.flush('full_name');
    this.permissionsService.flushPermissions();
  }

  flushAndRedirect() {
    this.flush();
    this.router.navigate([this.SystemConfig.unauthorizedRedirectTo]);
  }

  set auth(data: any) {
    if (data.roles) {
      data.roles.push('AUTHORIZED');
    } else {
      data['roles'] = ['AUTHORIZED'];
    }
    this.storageService.setData('user', data);
    this.authCheck();
  }

  get auth() {
    const _data = this.storageService.getData('user');
    if (_data) {
      return _data;
    } else {
      return null;
    }
  }

  login(data: Login): Observable<LoginOut> {
    return this.http.post<LoginOut>(this.baseUrl + '/login', data);
  }

  handlerChangefullNameSub(param: any): void {
    this.fullNameSub.next(param);
  }
}
