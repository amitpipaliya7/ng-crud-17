import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailFilter',
  standalone: true
})
export class EmailFilterPipe implements PipeTransform {

  transform(value:any, args: any) {
    if(args == '' || args == null){
      return value
    }
    else{
      return value.filter((ele:any)=>{
        return ele.email.includes(args)
      })
    }
  }

}
