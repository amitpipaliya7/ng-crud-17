import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService{

  constructor(private http : HttpClient ) { }
 
  url = "http://localhost:3000/student"

  getApi(){
    return this.http.get(this.url)
  }

  postApi(data:any){
    return this.http.post(this.url, data)
  }

  deleteApi(id:any){
    return this.http.delete("http://localhost:3000/student/"+id)
  }

  updateApi(id: any, data: any) {
    return this.http.put("http://localhost:3000/student/" + id, data);
  }

  GetEditUser(id:any){
    let editUserID=`${this.url}/${id}`
    return this.http.get(editUserID)
  }

  //for pagination
  urlUser = "http://localhost:3000/user"
  getApiOfUser(){
    return this.http.get(this.urlUser)
  }
}
