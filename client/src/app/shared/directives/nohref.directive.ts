import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[href]'
})
export class NohrefDirective {
  @Input() href: string;

  @HostListener('click', ['$event'])
  noop(event: MouseEvent) {
    if (this.href.length === 0 || this.href === '#') {
      event.preventDefault();
    }
  }
}
