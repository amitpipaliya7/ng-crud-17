import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../authService/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, 
    ToastrModule,
    CommonModule,
    NgxSpinnerModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  providers : [AuthService, NgxSpinnerService]
})
export class ChangePasswordComponent implements OnInit{
  constructor(private activatedRoute : ActivatedRoute, private toastr: ToastrService,private spinner: NgxSpinnerService){}

  authService:AuthService=inject(AuthService)

changePasswordForm = new FormGroup({
  curretpassword : new FormControl(null,[Validators.required]),
  newpassword : new FormControl(null,[Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
  confirmpassword : new FormControl(null,[Validators.required, Validators.minLength(10),Validators.maxLength(10)])
})  

get f (){
  return this.changePasswordForm.controls
}

  private changePassId: any
  private oldName:any
  private oldEmail:any
  private oldPassword:any

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((ele:any)=>{
      console.log(ele);
      
      this.changePassId = ele.id

      this.authService.changePasswordGetApi(ele.id).subscribe((ele:any)=>{
        console.log(ele); 
        this.oldPassword = ele.password
        this.oldEmail = ele.email
        this.oldName = ele.name
      })
    })
   
  }

  public submitted :boolean=false
  public savePassword(){
    
    this.submitted=true

    if(this.changePasswordForm.invalid){
      return 
    }

    let curretpassword = this.changePasswordForm.controls.curretpassword.value
    let newpassword = this.changePasswordForm.controls.newpassword.value
    let confirmPassword = this.changePasswordForm.controls.confirmpassword.value
    
    this.authService.changePasswordGetApi(this.changePassId).subscribe((ele)=>{
      console.log(ele); 
    })

    if(this.oldPassword !== curretpassword){
      this.toastr.error("Current pasword wrong")
      this.submitted = false
      return
    }
    if(newpassword !== confirmPassword){
      this.toastr.error("Confirm password is not match with new password")
      this.submitted = false
      return
    }
    else{
      this.authService.changePasswordUpdateApi(this.changePassId,this.oldName,this.oldEmail,confirmPassword).subscribe((ele)=>{
        console.log(ele);
      })
    this.toastr.success("Password change successfully !!")
    this.submitted=false  
    this.changePasswordForm.reset()
    }    
    
  }
}
