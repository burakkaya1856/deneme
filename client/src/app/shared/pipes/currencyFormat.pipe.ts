import { Pipe } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe {
  transform(value: string): string {


    if (value.indexOf(',') != -1) {
      let values = value.split('.');
      values[0] =  values[0].replace(/,/g, '.');
      values[1] = ',' + values[1];
      return values[0] + values[1];
    } else {
      return value.replace('.', ',');
    }
  }
}
