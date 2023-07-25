import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fa-dog-icon',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: ` <fa-icon [icon]="iconDefinition"></fa-icon> `,
  styles: [],
})
export class FaDogIconComponent {
  iconDefinition = faDog;
}
