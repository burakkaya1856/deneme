import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
  constructor() {}

  @Output()
  paginationChanged = new EventEmitter<boolean>();
  @Input()
  table: any = {};

  ngOnInit() {}
}
