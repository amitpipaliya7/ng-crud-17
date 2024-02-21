import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

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

}
