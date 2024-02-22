import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  // return true;
  const authService = inject(AuthService)
  const router = inject(Router)
  
  if (authService.isLoggin()) {
    return true;
  } else {
    router.navigate(['/login']); 
    return false;
  }
};
