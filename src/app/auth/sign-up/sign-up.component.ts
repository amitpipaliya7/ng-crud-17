import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../authService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  providers : [AuthService, ToastrService]
})
export class SignUpComponent {
  constructor(private authSer : AuthService, private router : Router, private toastr : ToastrService){
    this.getApi()
  }

  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3}$'

  signUpForm = new FormGroup({
    name : new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z]+$')]),
    email : new FormControl(null,[Validators.required,Validators.pattern(this.emailPattern)]),
    password : new FormControl(null,[Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
  })  

  get f (){
    return this.signUpForm.controls
  }

  submitted : boolean = false

  showData:any
  getApi(){
    this.authSer.getApi().subscribe((data:any)=>{
      this.showData = data
    })
  }

  signUp(){

    if(this.signUpForm.invalid){
      this.submitted=true
      return 
    }

    let emailSignup = this.signUpForm.controls.email.value
    // let passwordSignup = this.signUpForm.controls.password.value

    
   
    let data = {
      ...this.signUpForm.value
    }
    // let id:any ; 
    this.authSer.getApi().subscribe((res:any)=>{
        let d : any = res
         d.find((ele:any)=>{
          return d=ele.email===emailSignup
         })
         if(d){
          // this.toastr.error("Email already exist")
          this.toastr.error("Email already exist")
        }else{
         this.authSer.postApi(data).subscribe((ele:any)=>{
           console.log(ele);
          let id = ele.id

          const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
          localStorage.getItem("token")
          localStorage.setItem('token', jwtToken);

          this.toastr.success("Signup succesfull")
          this.router.navigate(['/student',id])
        }) 
        }

    })
    
      
    }


    loginPage(){
      this.router.navigate(['login'])
    }

}
