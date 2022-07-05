import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '@shared/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    @Inject('routeConfig') public routeConfig,
    @Inject('menuConfig') public menuConfig,
    public router: Router,
    public themeService: ThemeService
  ) {}

  menu = [];
  menuToggle: boolean;
  mobileToggle: boolean;
  sidebarFullscreen: boolean;

  ngOnInit() {
    this.createMenu();
    this.themeService.menuToggle$.subscribe(
      toggle => (this.menuToggle = toggle)
    );
    this.themeService.mobileToggle$.subscribe(
      toggle => (this.mobileToggle = toggle)
    );
  }

  createMenu() {
    this.menu = this.menuConfig;

    // we need collect data's from route config to fill our menu array
    // so we need to generate fullpath's of each saved route to compare below
    const routerArray: Array<object> = [];
    this.router.config.forEach((item, i) => {
      item['fullPath'] = '/' + item.path;
      routerArray.push(item);
      if (item.children) {
        item.children.forEach(childrenFirst => {
          childrenFirst['fullPath'] =
            '/' +
            (item.path.length > 0 ? item.path + '/' : '') +
            childrenFirst.path;
          routerArray.push(childrenFirst);
        });
      }
    });
    // we will collect title,icon etc from the component's own route config by finding it from fullpath
    this.menu.forEach(item => {
      let routeItem;
      if (item.fullPath) {
        routeItem = <any>(
          routerArray.find(el => el['fullPath'] === item.fullPath)
        );
        if (!(routeItem.data && routeItem.data.routeConfig)) {
          return;
        }
        const data = this.routeConfig[routeItem.data.routeConfig];
        item['title'] = data.title || '';
        item['icon'] = data.icon || '';
        item['permissions'] = [];
        if (data.permissions && data.permissions.only) {
          item.permissions.push(data.permissions.only);
        }
      }
      if (!item.children) {
        return;
      }
      item.children.forEach(childrenItem => {
        if (childrenItem.fullPath) {
          routeItem = <any>(
            routerArray.find(el => el['fullPath'] === childrenItem.fullPath)
          );
          if (!(routeItem.data && routeItem.data.routeConfig)) {
            return;
          }
          const data = this.routeConfig[routeItem.data.routeConfig];
          childrenItem['title'] = data.title || '';
          childrenItem['icon'] = data.icon || '';
          childrenItem['permissions'] = [];
          if (data.permissions && data.permissions.only) {
            childrenItem.permissions.push(data.permissions.only);
          }
        }
      });
    });
  }
}
