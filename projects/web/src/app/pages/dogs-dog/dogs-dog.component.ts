import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dogs-dog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>dogs-dog works!</p>
    <p>dogId: {{ dogId }}</p>
  `,
  styles: [],
})
export class DogsDogComponent {
  @Input() dogId?: string;
}
