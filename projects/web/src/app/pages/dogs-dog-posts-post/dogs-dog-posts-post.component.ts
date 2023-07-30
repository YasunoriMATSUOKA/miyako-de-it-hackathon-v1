import {
  Component,
  Input,
  OnChanges,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogService } from '../../services/dog/dog.service';
import { PostService } from '../../services/post/post.service';
import { Dog } from '../../services/dog/dog.type';
import { Post } from '../../services/post/post.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dogs-dog-posts-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2 class="normal-case text-xl">Dog Record</h2>
    <div *ngIf="post()?.userId as userId">
      User ID:
      <a class="link" routerLink="/users/{{ userId }}"> {{ userId }}</a>
    </div>
    <div *ngIf="post()?.dogId as dogId">
      Dog ID:
      <a class="link" routerLink="/dogs/{{ dogId }}"> {{ dogId }}</a>
    </div>
    <div>Title: {{ post()?.title }}</div>
    <div>Message: {{ post()?.message }}</div>
  `,
  styles: [],
})
export class DogsDogPostsPostComponent implements OnChanges {
  @Input() dogId?: string;
  @Input() postId?: string;

  private dogService = inject(DogService);
  private postService = inject(PostService);

  dog: WritableSignal<Dog | undefined> = signal(undefined);
  post: WritableSignal<Post | undefined> = signal(undefined);

  constructor() {
    effect(() => {
      if (this.dogId) {
        this.dogService.getDog(this.dogId).then((dog) => {
          this.dog.set(dog);
        });
      }
      if (this.dogId && this.postId) {
        this.postService.getPost(this.dogId, this.postId).then((post) => {
          this.post.set(post);
        });
      }
    });
  }

  ngOnChanges() {
    if (this.dogId) {
      this.dogService.getDog(this.dogId).then((dog) => {
        this.dog.set(dog);
      });
    }
    if (this.dogId && this.postId) {
      this.postService.getPost(this.dogId, this.postId).then((post) => {
        this.post.set(post);
      });
    }
  }
}
