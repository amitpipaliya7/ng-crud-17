import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../authService/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  providers : [
    AuthService
  ]
})
export class LogInComponent {

  constructor(private authSer : AuthService, private router : Router, private toastr: ToastrService){}

  public emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3}$';

  loginForm = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.pattern(this.emailPattern)]),
    password : new FormControl(null,[Validators.required, Validators.minLength(8)]),
  })  

  get f (){
    return this.loginForm.controls
  }

  public submitted : boolean = false

  public showData:any
  public getApi(){
    this.authSer.getApi().subscribe((data)=>{
      this.showData = data
    })
  }

  public logIn(){
    if(this.loginForm.invalid){
      this.submitted=true
      return 
    }

    let emailLogin = this.loginForm.controls.email.value
    let passwordLogin = this.loginForm.controls.password.value

    this.authSer.getApi().subscribe((response)=>{
    let id : any
    let email : any 
    let data:any=response
      data.find((ele:any)=>{
        id = ele.id
        email = ele.email
        return data = ele.email===emailLogin && ele.password==passwordLogin 
      })
      if(data){
        this.router.navigate(['/student', id])
        this.toastr.success("Login succesfully")
        const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        localStorage.getItem("token")
        localStorage.setItem('token', jwtToken);
      }else{
        this.toastr.error("You dont have account");
      }
    })
  }

 

  public signup(){
    this.router.navigate(['signup'])
  }
}
