import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './auth/authService/auth.service';
import { StudentService } from './studentService/student.service';

export const routes: Routes = [
    {
      path : 'student/:id',
      component : StudentComponent,
      canActivate : [AuthService],
      canDeactivate : [AuthService]    
    },
    {
      path:'login',
      component:LogInComponent
    },
    {
      path : 'signup',
      component : SignUpComponent
    },
    {
      path : 'studentedit/:id',
      component : StudentEditComponent,
      canActivate : [AuthService]


    },
    {
      path : 'studentprofile/:id',
      component : StudentProfileComponent,
      canActivate : [ AuthService],
    },
    {
      path : 'changepassword/:id',
      component : ChangePasswordComponent,
      canActivate : [AuthService],

    },
    {
      path : '**',
      component : NotFoundComponent
    }
];
