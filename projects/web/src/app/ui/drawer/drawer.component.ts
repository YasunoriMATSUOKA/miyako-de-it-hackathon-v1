import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, MenuComponent, NavbarComponent, FooterComponent],
  template: `
    <div class="drawer">
      <input id="app-menu-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col min-h-screen">
        <app-navbar
          [title]="title"
          [name]="name"
          [imageUrl]="imageUrl"
        ></app-navbar>

        <div class="flex-grow">
          <ng-content></ng-content>
        </div>

        <app-footer></app-footer>
      </div>
      <div class="drawer-side">
        <label for="app-menu-drawer" class="drawer-overlay"></label>
        <app-menu></app-menu>
      </div>
    </div>
  `,
  styles: [],
})
export class DrawerComponent {
  @Input() title = '';
  @Input() name = '';
  @Input() imageUrl = '';
}
