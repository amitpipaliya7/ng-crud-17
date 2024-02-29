import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../authService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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

  private emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3}$'

  signUpForm = new FormGroup({
    name : new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z]+$')]),
    email : new FormControl(null,[Validators.required,Validators.pattern(this.emailPattern)]),
    password : new FormControl(null,[Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
  })  

  get f (){
    return this.signUpForm.controls
  }

  public submitted : boolean = false

  public showData:any
  public getApi(){
    this.authSer.getApi().subscribe((data:any)=>{
      this.showData = data
    })
  }

  public signUp(){

      if(this.signUpForm.invalid){
        this.submitted=true
        return 
      }
      
      let emailSignup = this.signUpForm.controls.email.value    
      
      let data = {
        ...this.signUpForm.value
      }
        this.authSer.getApi().subscribe((res: any) => {
          let d: any = res;
        
          if (d.length === 0) {
            this.authSer.postApi(data).subscribe((ele: any) => {
              let id = ele.id;
              const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
              localStorage.getItem("token");
              localStorage.setItem('token', jwtToken);
            
              this.toastr.success("Signup successful");
              this.router.navigate(['/student', id]);
            });
          } else {
            d.find((ele: any) => {
              return d = ele.email === emailSignup;
            });

            if (d) {
              this.toastr.error("Email already exists");
            } else {
              this.authSer.postApi(data).subscribe((ele: any) => {
                let id = ele.id;
                const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
                localStorage.getItem("token");
                localStorage.setItem('token', jwtToken);
              
                this.toastr.success("Signup successful");
                this.router.navigate(['/student', id]);
              });
            }
          }
        }); 
  }


    public loginPage(){
      this.router.navigate(['login'])
    }

}
