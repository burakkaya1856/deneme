import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() checkboxParam: any = {
    marginLeft: '',
    labelText: '',
    labelSize: '',
    labelWeight: '',
    lineHeigth: '',
    color: '',
    width: ''
  };

  @Input() boxStyle: any = {
    width: '16px',
    height: '16px',
    checkMark: {
      fontSize: '8px',
      fontWeight: '900'
    }
  };
  @Input() checkbox: boolean;
  @Input() label: boolean = false;
  @Output() result = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handlerCheckbox() {
    this.checkbox = !this.checkbox;
    this.result.emit(this.checkbox);
  }
}
