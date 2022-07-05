import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(arr: any[], keywordToSearch: string): any {
    if (!arr || !keywordToSearch) return arr;

    return arr.filter((el: any) => {
      const rgxp = new RegExp(keywordToSearch, 'i');
      //@ts-ignore
      return rgxp.test(Object.values(el));
    });
  }
}
