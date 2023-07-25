import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FaBarsIconComponent } from '../icons/fontawesome/fa-bars-icon/fa-bars-icon.component';
import { AvatarMenuComponent } from '../avatar-menu/avatar-menu.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FaBarsIconComponent, AvatarMenuComponent],
  template: `
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <label for="app-menu-drawer" class="btn btn-ghost drawer-button">
            <app-fa-bars-icon></app-fa-bars-icon>
          </label>
        </div>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost normal-case text-xl" routerLink="">{{
          title
        }}</a>
      </div>
      <div class="navbar-end">
        <app-avatar-menu [imageUrl]="imageUrl" [name]="name"></app-avatar-menu>
      </div>
    </div>
  `,
  styles: [],
})
export class NavbarComponent {
  @Input() title = '';
  @Input() name = '';
  @Input() imageUrl = '';
}
