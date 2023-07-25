import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fa-arrow-right-to-bracket-icon',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: ` <fa-icon [icon]="iconDefinition"></fa-icon> `,
  styles: [],
})
export class FaArrowRightToBracketIconComponent {
  iconDefinition = faArrowRightToBracket;
}
