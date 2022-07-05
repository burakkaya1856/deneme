import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  menuToggle$: BehaviorSubject<boolean>;
  boxedLayout$: BehaviorSubject<boolean>;
  mobileToggle$: BehaviorSubject<boolean>;

  constructor() {
    this.boxedLayout$ = new BehaviorSubject(false);
    this.menuToggle$ = new BehaviorSubject(false);
    this.mobileToggle$ = new BehaviorSubject(false);
  }
  setBoxedLayout(data) {
    this.boxedLayout$.next(data);
  }
  setMenuToggle(data) {
    this.menuToggle$.next(data);
  }
  setMobileToggle(data) {
    this.mobileToggle$.next(data);
  }
}
