import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isAuthenticated$ = toObservable(
    computed(() => Boolean(authService.authUser()?.uid)),
  );
  isAuthenticated$.pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated === undefined) {
        router.navigate(['/auth/sign-in']);
      }
    }),
  );
  return isAuthenticated$;
};
