import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

export const routes: Routes = [
    {
      path : 'student',
      component : StudentComponent,
      // canDeactivate : [AuthService],  
      // canActivate : [AuthGuard],
        
    },
    {
      path:'login',
      component:LogInComponent
    },
    {
      path : 'signup',
      component : SignUpComponent
    }
];
