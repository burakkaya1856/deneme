import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '@shared/services';

@Component({
  selector: 'app-menu-horizontal',
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.scss']
})
export class MenuHorizontalComponent implements OnInit {
  menu = [];
  menuToggle: boolean;
  mobileToggle: boolean;
  sidebarFullscreen: boolean;
  boxedLayout: boolean;
  collapsed = true;

  constructor(
    @Inject('routeConfig') public routeConfig,
    @Inject('menuConfig') public menuConfig,
    public router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.createMenu();
    this.themeService.boxedLayout$.subscribe(
      response => (this.boxedLayout = response)
    );
    this.themeService.menuToggle$.subscribe(
      toggle => (this.menuToggle = toggle)
    );
    this.themeService.mobileToggle$.subscribe(
      toggle => (this.mobileToggle = toggle)
    );
  }

  createMenu() {
    this.menu = this.menuConfig;

    // we will collect title,icon etc from the component's own route config by finding it from fullpath
    this.menu.forEach(item => {
      if (item.fullPath && this.routeConfig[item.routeConfig]) {
        const data = this.routeConfig[item.routeConfig];
        item['title'] = data.title || '';
        item['icon'] = data.icon || '';
        item['permissions'] = [];
        if (data.permissions && data.permissions.only) {
          item.permissions = data.permissions.only;
        }
      }
      if (!item.children) {
        return;
      }
      item.children.forEach(childrenItem => {
        if (
          childrenItem.fullPath &&
          this.routeConfig[childrenItem.routeConfig]
        ) {
          const data = this.routeConfig[childrenItem.routeConfig];
          childrenItem['title'] = data.title || '';
          childrenItem['icon'] = data.icon || '';
          childrenItem['permissions'] = [];
          if (data.permissions && data.permissions.only) {
            childrenItem.permissions = data.permissions.only;
          }
        }
      });
    });
  }
}
