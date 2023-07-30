import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { AvatarWithTooltipComponent } from '../avatar-with-tooltip/avatar-with-tooltip.component';
import { FaDogIconComponent } from '../icons/fontawesome/fa-dog-icon/fa-dog-icon.component';
import { FaArrowRightToBracketIconComponent } from '../icons/fontawesome/fa-arrow-right-to-bracket-icon/fa-arrow-right-to-bracket-icon.component';
import { FaArrowRightFromBracketIconComponent } from '../icons/fontawesome/fa-arrow-right-from-bracket-icon/fa-arrow-right-from-bracket-icon.component';
import { FaHomeIconComponent } from '../icons/fontawesome/fa-home-icon/fa-home-icon.component';
import { FaUserPlusIconComponent } from '../icons/fontawesome/fa-user-plus-icon/fa-user-plus-icon.component';
import { FaQrcodeIconComponent } from '../icons/fontawesome/fa-qrcode-icon/fa-qrcode-icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-avatar-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AvatarWithTooltipComponent,
    MenuComponent,
    FaHomeIconComponent,
    FaDogIconComponent,
    FaQrcodeIconComponent,
    FaArrowRightToBracketIconComponent,
    FaArrowRightFromBracketIconComponent,
    FaUserPlusIconComponent,
  ],
  template: `
    <details class="dropdown dropdown-end">
      <summary>
        <app-avatar-with-tooltip
          [imageUrl]="imageUrl"
          [name]="name"
        ></app-avatar-with-tooltip>
      </summary>
      <ul class="menu dropdown-content z-[1] bg-base-200 w-56 rounded-box">
        <li>
          <a routerLink="">
            <app-fa-home-icon></app-fa-home-icon>
            Home
          </a>
        </li>
        <li *ngIf="name">
          <a routerLink="/dogs/create">
            <app-fa-dog-icon></app-fa-dog-icon>
            Register dog
          </a>
        </li>
        <li>
          <a routerLink="/scan">
            <app-fa-qrcode-icon></app-fa-qrcode-icon>
            Scan
          </a>
        </li>
        <li *ngIf="!name">
          <a routerLink="/auth/sign-in">
            <app-fa-arrow-right-to-bracket-icon></app-fa-arrow-right-to-bracket-icon>
            Sign in
          </a>
        </li>
        <li *ngIf="name">
          <a routerLink="/auth/sign-out">
            <app-fa-arrow-right-from-bracket-icon></app-fa-arrow-right-from-bracket-icon>
            Sign out
          </a>
        </li>
      </ul>
    </details>
  `,
  styles: [],
})
export class AvatarMenuComponent {
  @Input() name = '';
  @Input() imageUrl = '';
}
