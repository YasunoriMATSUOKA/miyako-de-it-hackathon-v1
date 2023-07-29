import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  authState,
  user,
  idToken,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  authUser = toSignal(user(this.auth));
  authState = toSignal(authState(this.auth));
  idToken = toSignal(idToken(this.auth));

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  async signOut() {
    await signOut(this.auth);
  }
}
