import { Directive, ElementRef, Input, Renderer2, OnInit, OnChanges } from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[overlayLoading]'
})
export class OverlayLoadingDirective implements OnInit, OnChanges {

  @Input() overlayLoading = {};
  loadingDiv = null;

  constructor(private elem: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(this.elem.nativeElement, 'overlay-loading-parent');
    this.loadingDiv = document.createElement('div');
    this.loadingDiv.className = 'overlay-loading';
    this.renderer.appendChild(this.elem.nativeElement, this.loadingDiv);
    if(this.overlayLoading){
      this.renderer.setStyle(this.loadingDiv, 'display', 'block');
    }
  }

  ngOnChanges(changes) {
    if (changes.overlayLoading && this.loadingDiv) {
      if (this.overlayLoading) {
        this.renderer.setStyle(this.loadingDiv, 'display', 'block');
      } else {
        this.renderer.setStyle(this.loadingDiv, 'display', 'none');
      }
    }
  }
}
