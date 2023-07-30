import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DrawerComponent } from './ui/drawer/drawer.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DrawerComponent],
  template: `
    <app-drawer
      [title]="title"
      [name]="avatarName()"
      [imageUrl]="avatarImageUrl()"
    >
      <router-outlet></router-outlet>
    </app-drawer>
  `,
  styles: [],
})
export class AppComponent {
  authService = inject(AuthService);

  title = 'DOGs';
  avatarName = computed(() => this.authService.authUser()?.displayName ?? '');
  avatarImageUrl = computed(() => this.authService.authUser()?.photoURL ?? '');
}
