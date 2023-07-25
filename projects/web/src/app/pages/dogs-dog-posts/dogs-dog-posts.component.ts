import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dogs-dog-posts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>dogs-dog-posts works!</p>
    <p>dogId: {{ dogId }}</p>
  `,
  styles: [],
})
export class DogsDogPostsComponent {
  @Input() dogId?: string;
}
