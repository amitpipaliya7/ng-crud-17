import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../authService/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { empty } from 'rxjs';

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

  constructor(private authSer : AuthService, private router : Router, private toastr: ToastrService){;
    
  }

  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3}$';

  loginForm = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.pattern(this.emailPattern)]),
    password : new FormControl(null,[Validators.required, Validators.minLength(8)]),
  })  

  get f (){
    return this.loginForm.controls
  }


  submitted : boolean = false

  showData:any
  getApi(){
    this.authSer.getApi().subscribe((data)=>{
      this.showData = data
    })
  }

  

  logIn(){
    // console.log(this.signUpForm.value);

    if(this.loginForm.invalid){
      this.submitted=true
      return 
    }

    let emailLogin = this.loginForm.controls.email.value
    let passwordLogin = this.loginForm.controls.password.value


    // localstorage
    // let localData = JSON.parse(localStorage.getItem("LoginData"));

    // let localData = JSON.parse(localStorage.getItem("token"));
    

    // let id 
   
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
        // this.router.navigate(['/student'])
      
        const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        // localData={email: emailLogin, password:passwordLogin, id:id};
        // localStorage.setItem('LoginData', JSON.stringify(localData)); 
        // const jwtToken = data.name

        localStorage.getItem("token")
        localStorage.setItem('token', jwtToken);
        // localStorage.setItem('token', JSON.stringify(email));

        // console.log(setlocal, " local data");
        
      }else{
        this.toastr.error("You dont have account");
      }
    })
  }

 

  signup(){
    this.router.navigate(['signup'])
  }
}
