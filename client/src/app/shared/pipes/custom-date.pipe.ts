import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

@Pipe({ name: 'customDatePipe' })
export class CustomDatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}
  transform(jsDate: Date, time: boolean): any {
    let result;
    const date = new Date(jsDate);
    this.translate
      .get(`globals.months.${Months[date.getMonth()]}`)
      .subscribe(monthTranslation => {
        const dayOfMonth = ('0' + date.getDate()).slice(-2);
        const nameOfMonth = monthTranslation;
        const year = date.getFullYear();
        result = dayOfMonth + ' ' + nameOfMonth + ' ' + year;
      });
    if (time) {
      const hour = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      result = result + ' ' + hour + ':' + minutes;
    }
    return result;
  }
}
