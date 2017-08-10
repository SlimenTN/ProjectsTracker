
import {FormControl} from "@angular/forms";
export class DateValidator{
  static invalidDate(control: FormControl){
    let v = control.value;
    if(v.length > 0 && !DateValidator.dateMatch(v))
      return {invalidDate: true, requiredFormat: 'dd/mm/yyy'};
    return null;
  }

  static dateMatch(date: string){
    return date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  }
}
