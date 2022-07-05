import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ThemeService } from '@shared/services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  today: number = Date.now();
  footerToggle: boolean;
  boxedLayout: boolean;

  constructor(
    public themeService: ThemeService,
    public bsModalService: BsModalService
  ) {
    this.themeService.boxedLayout$.subscribe(
      response => (this.boxedLayout = response)
    );
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
