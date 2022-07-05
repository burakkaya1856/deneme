import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumbersOnlyDirective {
  constructor(private el: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // NOTE: use NgControl patchValue to prevent the issue on validation
    this.el.control.patchValue(value.replace(/[^0-9]/g, ''));
  }

}