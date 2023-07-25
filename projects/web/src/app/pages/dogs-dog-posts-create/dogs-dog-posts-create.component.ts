import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dogs-dog-posts-create',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>dogs-dog-posts-create works!</p>
    <p>dogId: {{ dogId }}</p>
  `,
  styles: [],
})
export class DogsDogPostsCreateComponent {
  @Input() dogId?: string;
}
