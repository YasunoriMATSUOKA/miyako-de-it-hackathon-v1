import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fa-arrow-right-from-bracket-icon',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: ` <fa-icon [icon]="iconDefinition"></fa-icon> `,
  styles: [],
})
export class FaArrowRightFromBracketIconComponent {
  iconDefinition = faArrowRightFromBracket;
}
