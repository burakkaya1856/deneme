import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';

//components
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuHorizontalComponent } from './components/menu-horizontal/menu-horizontal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableDetailsModalComponent } from './components/table-details-modal/table-details-modal.component';
//directives
import { EnumValidator } from './directives/enum.validator';
import { NohrefDirective } from './directives/nohref.directive';
import { OverlayLoadingDirective } from './directives/overlay-loading.directive';
import { TableSortDirective } from './directives/table-sort.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { NoRightClickDirective } from './directives/no-right-click.directive';

//pipe
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { CurrencyFormatPipe } from './pipes/currencyFormat.pipe';
// plugins
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomFormsModule } from 'ngx-custom-validators';
import { MomentModule } from 'ngx-moment';
import { OrderModule } from 'ngx-order-pipe';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ClipboardModule } from 'ngx-clipboard';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { TranslateModule } from '@ngx-translate/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { NgxIbanModule } from 'ngx-iban';
import { NotaccessComponent } from './components/notaccess/notaccess.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    //components
    AlertComponent,
    ConfirmModalComponent,
    CountdownTimerComponent,
    NotfoundComponent,
    PaginationComponent,
    TitlebarComponent,
    BreadcrumbComponent,
    FooterComponent,
    MenuComponent,
    MenuHorizontalComponent,
    NavbarComponent,
    TableDetailsModalComponent,
    NotaccessComponent,
    //directives
    EnumValidator,
    NohrefDirective,
    OverlayLoadingDirective,
    TableSortDirective,
    NumbersOnlyDirective,

    // Pipes
    SearchFilterPipe,
    CustomDatePipe,
    CurrencyFormatPipe,
    DeleteModalComponent,
    SpinnerComponent,
    CheckboxComponent,
    NoRightClickDirective
  ],
  imports: [
    // core
    RouterModule,
    CommonModule,
    FormsModule,
    // plugins
    NgSelectModule,
    CustomFormsModule,
    MomentModule,
    OrderModule,
    AngularEditorModule,
    UiSwitchModule,
    ClipboardModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    NgxPermissionsModule.forChild(),
    FilterPipeModule,
    TranslateModule.forChild(),
    LoggerModule.forRoot({
      serverLoggingUrl: '/log',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: true
    }),
    NgxIbanModule
  ],
  providers: [],
  exports: [
    // core
    CommonModule,
    FormsModule,
    //components
    AlertComponent,
    SpinnerComponent,
    CheckboxComponent,
    ConfirmModalComponent,
    CountdownTimerComponent,
    NotfoundComponent,
    PaginationComponent,
    TitlebarComponent,
    BreadcrumbComponent,
    FooterComponent,
    MenuComponent,
    MenuHorizontalComponent,
    NavbarComponent,
    TableDetailsModalComponent,
    NotaccessComponent,
    DeleteModalComponent,
    //directives
    EnumValidator,
    NohrefDirective,
    OverlayLoadingDirective,
    TableSortDirective,
    NumbersOnlyDirective,
    NoRightClickDirective,
    // modules
    NgSelectModule,
    CustomFormsModule,
    MomentModule,
    OrderModule,
    UiSwitchModule,
    ClipboardModule,
    ModalModule,
    AlertModule,
    PaginationModule,
    TooltipModule,
    BsDatepickerModule,
    TimepickerModule,
    BsDropdownModule,
    AngularEditorModule,
    PopoverModule,
    CollapseModule,
    NgxPermissionsModule,
    FilterPipeModule,
    TranslateModule,
    // Pipes
    SearchFilterPipe,
    CustomDatePipe,
    CurrencyFormatPipe,
    // Plugins
    NgxIbanModule
  ]
})
export class SharedModule {}
