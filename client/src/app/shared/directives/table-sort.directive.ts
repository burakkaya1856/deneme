import {
  HostListener,
  Directive,
  ElementRef,
  Input,
  Output,
  Renderer2,
  AfterViewInit,
  EventEmitter
} from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[tableSort]'
})
export class TableSortDirective implements AfterViewInit {
  @Input()
  sort: Sort = {};

  @Input()
  tableSort: Sort = {};

  @Output()
  tableSortChanged: EventEmitter<Sort> = new EventEmitter<Sort>();

  constructor(private elem: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.sort = this.tableSort;
    this.applyChanges(this.sort.sortBy, true);
  }

  applyChanges(sortBy, init = false) {
    const children: Array<HTMLElement> = Array.from(
      this.elem.nativeElement.children
    );
    children.forEach(item => {
      if (!item.getAttribute('sortBy')) {
        return true;
      }
      this.renderer.removeClass(item, 'asc');
      this.renderer.removeClass(item, 'desc');
      if (
        !init &&
        this.sort.sortBy === sortBy &&
        item.getAttribute('sortBy') === this.sort.sortBy
      ) {
        this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
      }

      if (item.getAttribute('sortBy') === sortBy) {
        if (this.sort.order === 'desc') {
          this.renderer.addClass(item, 'desc');
        } else {
          this.renderer.addClass(item, 'asc');
        }
      }

      if (init) {
        this.renderer.addClass(item, 'tableSortItem');
        this.renderer.addClass(item, 'cursor-pointer');
      }
    });
  }

  @HostListener('click', ['$event'])
  onClick($event) {
    const sortBy = $event.target.getAttribute('sortBy');
    if (!sortBy) {
      return true;
    }
    this.applyChanges(sortBy);
    this.sort.sortBy = sortBy;
    this.tableSortChanged.emit(this.sort);
  }
}

interface Sort {
  order?: string;
  sortBy?: string;
}
