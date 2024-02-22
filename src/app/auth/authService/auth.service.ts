import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, CanDeactivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StudentComponent } from '../../student/student.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanDeactivate<StudentComponent>, CanActivate{

  constructor(private http : HttpClient,private route:Router) { }




  url = "http://localhost:3000/data"

  getApi(){
    return this.http.get(this.url)
  }

  postApi(data:any){
    return this.http.post(this.url, data)
  }

   //My Profile
   GetMyProfileApi(id:any){
    // let editUserID=`${this.url}/${id}`
    return this.http.get("http://localhost:3000/data/" + id)
  }

  changePasswordGetApi(id:any){
    let getapiUrl = `${this.url}/${id}`
    return this.http.get(getapiUrl)
  }

  changePasswordUpdateApi(id:any, name:any, email:any, confirmpassword:any){
    const data = { name:name ,email :email , password: confirmpassword };
    return this.http.put("http://localhost:3000/data/"+id, data);
  }

  Logggin = 'safdd'
  isLoggin(){
    return this.Logggin.length > 0
  }

  canDeactivate(component: StudentComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.onExit()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let token = window.localStorage.getItem("token")
      if (token == null) {
        this.route.navigate(['login'])
        return false
      }
      else {
        return true
      }
  }
}
