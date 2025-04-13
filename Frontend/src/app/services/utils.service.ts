import { Injectable } from '@angular/core';

enum SortMode {
  DESC = "descending",
  ASC = "ascending"
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public static sortListByAttribute(list: any[], attribute: string, mode: SortMode = SortMode.ASC) : any[] {
    if (mode === SortMode.ASC) {
      return list.sort( (a, b) => a[attribute] - b[attribute]);
    } else {
      return list.sort( (a, b) => b[attribute] - a[attribute]);
    }
  }
}
