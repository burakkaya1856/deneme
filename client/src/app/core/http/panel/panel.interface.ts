export interface PanelUserOut {
  items: PanelUsers[];
  total: number;
  page: number;
  size: number;
}

export interface PanelUsers {
  id: string;
  date_created: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  status: string;
  permissions: Array<Permissions>;
}

interface Permissions {
  id: number;
  permission_type: string;
  description: string;
}

export interface Register {
  name: string;
  surname: string;
  email: string;
  role_id: string;
  permissions_ids: Array<any>;
}

export interface MessageOut {
  message: string;
}

export interface AllPanelUser {
  q: string;
  page: number;
  size: number;
}

export interface PanelUserRegisterIn {
  email: string;
  password: string;
  email_verification_code: string;
}

export interface ChangePasswordIn {
  old_password: string;
  new_password: string;
}

export interface PanelRoleParams {
  search: string;
  page: number;
  size: number;
}

export interface RoleIn {
  name: string;
  code: string;
  permissions_ids: any;
}

export interface RoleOut {
  id: number;
  date_created: string;
  name: string;
  code: string;
  permissions: Permissions[];
}

export interface PermissionIn {
  permission_type: string;
  description: string;
  status: string;
}

export interface PermissionOut {
  id: number;
  date_created: string;
  permission_type: string;
  description: string;
  status: string;
}

export interface PanelUserUpdateIn {
  name: string;
  surname: string;
  email: string;
  role_id: string;
  permissions_ids: Array<number>;
  status: string;
}

export interface PermissionUserOut {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
}

export interface ConfirmationParams {
  page: number;
  size: number;
}

interface ConfirmationItems {
  id: string;
  date_created: string;
  endpoint: string;
  description: string;
  type: string;
  process_type: string;
  change_confirmation: true;
  status: string;
  previous_data: {};
  confirmation_data: {};
  submitted_by: {
    id: string;
    full_name: string;
  };
  managed_user: {
    panel_user: {
      id: string;
      full_name: string;
    };
    status: string;
    date_created: string;
  };
}

export interface ConfirmationOut {
  items: ConfirmationItems[];
  total: number;
  page: number;
  size: number;
}

export interface ConfirmationIn {
  status: string;
}

export interface ManagedUserOut {
  panel_user: {
    id: string;
    full_name: string;
  };
  status: string;
  date_created: string;
}
