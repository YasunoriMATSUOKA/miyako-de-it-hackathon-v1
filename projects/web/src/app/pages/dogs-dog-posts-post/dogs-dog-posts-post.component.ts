import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dogs-dog-posts-post',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>dogs-dog-posts-post works!</p>
    <p>dogId: {{ dogId }}</p>
    <p>postId: {{ postId }}</p>
  `,
  styles: [],
})
export class DogsDogPostsPostComponent {
  @Input() dogId?: string;
  @Input() postId?: string;
}
