import { Component, OnInit, Output, Inject } from '@angular/core';
import { RouteService } from '@shared/services';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html'
})
export class TitlebarComponent implements OnInit {
  @Output()
  header: Header;

  constructor(
    @Inject('routeConfig') public routeConfig,
    public routeService: RouteService
  ) {}

  ngOnInit() {
    this.routeService.onRouteChange$.subscribe(route => {
      if (route && route && route.routeConfig) {
        const data = this.routeConfig[route.routeConfig];
        if (data && !data.hideHeader) {
          this.header = {
            title: data.title,
            desc: data.desc || '',
            icon: data.icon || ''
          };
        }
      }
    });
  }
}

interface Header {
  title: string;
  desc: string;
  icon: string;
}
