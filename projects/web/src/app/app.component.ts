import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DrawerComponent } from './ui/drawer/drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DrawerComponent],
  template: `
    <app-drawer [title]="title" [name]="avatarName" [imageUrl]="avatarImageUrl">
      <router-outlet></router-outlet>
    </app-drawer>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Proof of Pedigree';
  avatarName = 'Dummy Name';
  avatarImageUrl =
    'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg';
}
