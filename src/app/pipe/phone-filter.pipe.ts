import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFilter',
  standalone: true
})
export class PhoneFilterPipe implements PipeTransform {

  transform(value: any, args: any) {
    if(args == '' || args == null){
      return value
    }
    else{
      return value.filter((ele:any)=>{
        return ele.PhoneNumber.includes(args)
      })
    }
  }
}
