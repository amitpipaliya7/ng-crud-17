import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/authService/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, 
    ToastrModule,
    CommonModule
  ],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss',
  providers : [AuthService]
})
export class StudentProfileComponent {

  constructor(private activatedRoute:ActivatedRoute, private authSer : AuthService){}

  MyProfileData:any= []
  MyProfileId: any
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((ele:any)=>{
      this.MyProfileId = ele.id    
    })
    
    this.authSer.GetMyProfileApi(this.MyProfileId).subscribe((ele:any)=>{
      // console.log(ele);
      // this.MyProfileData = ele
      this.MyProfileData.push(ele)
    })

    
  }
}
