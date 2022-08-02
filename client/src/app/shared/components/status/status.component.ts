import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'status',
  template: `
    <span
      class="badge"
      [ngClass]="{
        'badge-danger': status === 'deleted',
        'badge-info': status === 'passive',
        'badge-success': status === 'active'
      }"
    >
      {{ 'settings.bank.list.tableStatus.' + status | translate }}
    </span>
  `
})
export class StatusComponent implements OnInit {
  @Input() status: string;
  constructor() {}

  ngOnInit(): void {}
}
