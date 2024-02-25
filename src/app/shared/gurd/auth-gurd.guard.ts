import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGurdGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem?.('userToken') != null) {
    return true;
  } else {
    let _Router = inject(Router);
    _Router.navigate(['/login']);
    return false;
  }
};
