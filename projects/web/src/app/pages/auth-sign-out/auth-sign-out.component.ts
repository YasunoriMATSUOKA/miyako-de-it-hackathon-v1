import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-sign-out',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>auth-sign-out works!</p> `,
  styles: [],
})
export class AuthSignOutComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
