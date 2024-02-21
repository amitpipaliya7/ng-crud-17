import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter',
  standalone: true
})
export class NameFilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {

  transform(value: any, args: any) {
    if(args == ''|| args == null ){
      return value
    } 
    else{
      return value.filter((ele:any)=>{
        // let fullname=ele.firstname.concat(ele.lastname).includes(args)
        // let fullname = (ele.firstname + ' ' +ele.lastname).toLowerCase().includes(args)
        let eleFirstname = ele.firstname.toLowerCase()
        let eleLastname = ele.lastname.toLowerCase()

        let saveArgu=args.toLowerCase()
        
        let fullname = (eleFirstname + ' ' +eleLastname).includes(saveArgu)
        return fullname
      })
    }

  }
 

}
