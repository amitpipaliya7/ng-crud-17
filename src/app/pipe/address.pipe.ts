import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address',
  standalone: true
})
export class AddressPipe implements PipeTransform {

  transform(value: any) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
