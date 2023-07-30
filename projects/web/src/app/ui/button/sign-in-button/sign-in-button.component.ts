import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaGoogleIconComponent } from '../../icons/fontawesome/fa-google/fa-google-icon.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in-button',
  standalone: true,
  imports: [CommonModule, FaGoogleIconComponent],
  template: `
    <button class="btn btn-info" (click)="clickHandler()">
      <app-fa-google-icon></app-fa-google-icon>
      {{ label }}
    </button>
  `,
  styles: [],
})
export class SignInButtonComponent {
  label = 'with Google';

  private authService = inject(AuthService);

  async clickHandler() {
    await this.authService.signInWithGoogle();
  }
}
