import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-fa-google-icon',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: ` <fa-icon [icon]="iconDefinition"></fa-icon> `,
  styles: [],
})
export class FaGoogleIconComponent {
  iconDefinition = faGoogle;
}
