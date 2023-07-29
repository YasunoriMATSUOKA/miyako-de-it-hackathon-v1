import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInButtonComponent } from '../../ui/button/sign-in-button/sign-in-button.component';

@Component({
  selector: 'app-auth-sign-in',
  standalone: true,
  imports: [CommonModule, SignInButtonComponent],
  template: `
    <div class="hero">
      <div class="hero-content flex-col">
        <h2 class="text-2xl">Sign in</h2>
        <app-sign-in-button></app-sign-in-button>
      </div>
    </div>
  `,
  styles: [],
})
export class AuthSignInComponent {}
