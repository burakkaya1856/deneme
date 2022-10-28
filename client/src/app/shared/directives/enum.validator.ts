import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appEnum]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EnumValidator,
      multi: true
    }
  ]
})
export class EnumValidator implements Validator {
  @Input() appEqual: string;
  validate(c: AbstractControl): {} {
    console.log(c.value);

    if (!c.value) {
      return null;
    }

    const ENUM_REGEXP = /^[a-zA-Z]*$/;
    if (c.value && ENUM_REGEXP.test(c.value)) {
      return true;
    } else {
      return { enum: false };
    }
  }
}
