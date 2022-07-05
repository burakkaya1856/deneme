import { Component, OnInit, Output } from '@angular/core';
import { RouteService } from '../../services/index';
import { ThemeService } from '@shared/services';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  @Output()
  breadcrumb = [];

  constructor(
    public routeService: RouteService,
    public themeService: ThemeService
  ) {}

  boxedLayout: boolean;

  ngOnInit() {
    this.themeService.boxedLayout$.subscribe(
      response => (this.boxedLayout = response)
    );

    this.routeService.onRouteChange$.subscribe((route: any) => {
      if (route) {
        if (route.data && route.data.title && !route.data.hideHeader) {
          this.breadcrumb = [];
          // active breadcrumb
          const item = {
            title: route.data.title,
            url: route._routerState.url
          };
          if (route.data.breadcrumb === true) {
            this.breadcrumb.push(item);
          }
          // parent breadcrumds
          if (route.parent) {
            let el = route.parent;
            // parse parent tree in order
            while (el && el.data && el.data.title) {
              // create parsed parents url from upper parents
              let url = '',
                _el = el;
              while (_el.routeConfig) {
                url = _el.routeConfig.path + (url ? '/' + url : '');
                _el = _el.parent;
              }
              // push parent paths in order
              const itemSub = {
                title: el.data.title,
                url: '/' + url
              };
              if (el.data.breadcrumb === true) {
                this.breadcrumb.push(itemSub);
              }
              el = el.parent;
            }
          }
          this.breadcrumb = this.breadcrumb.reverse();
        }
      }
    });
  }
}
