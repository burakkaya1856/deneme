import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AllPanelUser,
  ChangePasswordIn,
  ConfirmationIn,
  ConfirmationOut,
  ConfirmationParams,
  ManagedUserOut,
  MessageOut,
  PanelRoleParams,
  PanelUserOut,
  PanelUserRegisterIn,
  PanelUsers,
  PanelUserUpdateIn,
  PermissionIn,
  PermissionOut,
  PermissionUserOut,
  Register,
  RoleIn,
  RoleOut
} from './panel.interface';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  private baseUrl = 'api/admin/v1/panel';

  constructor(
    @Inject('systemConfig') public SystemConfig,
    protected http: HttpClient
  ) {}

  getPanelUsers(panelUsers: AllPanelUser): Observable<PanelUserOut> {
    let options = {
      params: new HttpParams()
        .set('q', panelUsers.q)
        .set('page', panelUsers.page.toString())
        .set('size', panelUsers.size.toString())
    };

    return this.http.get<PanelUserOut>(this.baseUrl + '/panel-user/', options);
  }

  panelUserDetail(userId: string): Observable<PanelUsers> {
    return this.http.get<PanelUsers>(this.baseUrl + '/panel-user/' + userId);
  }

  panelUserUpdate(
    userId: string,
    userData: PanelUserUpdateIn
  ): Observable<MessageOut> {
    return this.http.put<MessageOut>(
      this.baseUrl + '/panel-user/' + userId,
      userData
    );
  }

  panelUserPreRegister(preRegister: Register): Observable<MessageOut> {
    return this.http.post<MessageOut>(
      this.baseUrl + '/panel-user/',
      preRegister
    );
  }

  panelUserRegisterComplete(
    registerComplete: PanelUserRegisterIn
  ): Observable<MessageOut> {
    return this.http.post<MessageOut>(
      this.baseUrl + '/panel-user/register',
      registerComplete
    );
  }

  panelUserChangePassword(
    changePassword: ChangePasswordIn
  ): Observable<MessageOut> {
    return this.http.put<MessageOut>(
      this.baseUrl + '/panel-user/change-password',
      changePassword
    );
  }

  panelLogout(): Observable<MessageOut> {
    return this.http.post<MessageOut>(
      this.baseUrl + '/panel-user/logout',
      null
    );
  }

  panelRoles(roles: PanelRoleParams): Observable<PanelUserOut> {
    let options = {
      params: new HttpParams()
        .set('search', roles.search)
        .set('page', roles.page.toString())
        .set('size', roles.size.toString())
    };
    return this.http.get<PanelUserOut>(this.baseUrl + '/panel-role', options);
  }

  panelRoleCreate(roleData: RoleIn): Observable<MessageOut> {
    return this.http.post<MessageOut>(this.baseUrl + '/panel-role/', roleData);
  }

  panelRoleDetail(roleId: string): Observable<RoleOut> {
    return this.http.get<RoleOut>(this.baseUrl + '/panel-role/' + roleId);
  }

  panelRoleUpdate(roleId: string, roleData: RoleIn): Observable<MessageOut> {
    return this.http.put<MessageOut>(
      this.baseUrl + '/panel-role/' + roleId,
      roleData
    );
  }

  panelRoleDelete(roleId: string): Observable<MessageOut> {
    return this.http.delete<MessageOut>(this.baseUrl + '/panel-role/' + roleId);
  }

  panelPermissions(): Observable<PermissionOut> {
    return this.http.get<PermissionOut>(this.baseUrl + '/panel-permission/');
  }

  panelPermissionCreate(permissionData: PermissionIn): Observable<MessageOut> {
    return this.http.post<MessageOut>(
      this.baseUrl + '/panel-permission/',
      permissionData
    );
  }

  panelPermissionDetail(permissionId: string): Observable<PermissionOut> {
    return this.http.get<PermissionOut>(
      this.baseUrl + '/panel-permission/' + permissionId
    );
  }

  panelPermissionUpdate(
    permissionId: string,
    permissionData: PermissionIn
  ): Observable<MessageOut> {
    return this.http.put<MessageOut>(
      this.baseUrl + '/panel-permission/' + permissionId,
      permissionData
    );
  }

  panelPermissionDelete(permissionId: string): Observable<MessageOut> {
    return this.http.delete<MessageOut>(
      this.baseUrl + '/panel-permission/' + permissionId
    );
  }

  panelPermissionUsers(permissionId: string): Observable<PermissionUserOut> {
    return this.http.get<PermissionUserOut>(
      this.baseUrl + '/panel-permission/' + permissionId + '/panel-user'
    );
  }

  panelConfirmations(
    confirmations: ConfirmationParams
  ): Observable<ConfirmationOut> {
    let options = {
      params: new HttpParams()
        .set('page', confirmations.page.toString())
        .set('size', confirmations.size.toString())
    };
    return this.http.get<ConfirmationOut>(
      this.baseUrl + '/confirmation/',
      options
    );
  }

  panelConfirmationCreate(
    confirmationId: string,
    status: ConfirmationIn
  ): Observable<MessageOut> {
    return this.http.post<MessageOut>(
      this.baseUrl + '/confirmation/' + confirmationId,
      status
    );
  }

  panelConfirmManageList(confirmationId: string): Observable<ManagedUserOut> {
    return this.http.get<ManagedUserOut>(
      this.baseUrl + '/confirmation/' + confirmationId + '/panel_user'
    );
  }
}
