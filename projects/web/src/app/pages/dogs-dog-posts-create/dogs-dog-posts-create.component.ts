import {
  Component,
  Input,
  OnChanges,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { DogService } from '../../services/dog/dog.service';
import { Router } from '@angular/router';
import { Dog } from '../../services/dog/dog.type';
import { User } from '../../services/user/user.type';
import { UserService } from '../../services/user/user.service';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-dogs-dog-posts-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2 class="normal-case text-xl">Register Dog Record</h2>
    <form class="w-full" #form="ngForm" (ngSubmit)="handleSubmit()">
      <div class="form-control w-full">
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label class="label">
          <span class="label-text">Title</span>
        </label>
        <input
          name="title"
          [ngModel]="title()"
          (ngModelChange)="title.set($event)"
          type="text"
          placeholder="Example: Happy Birthday!"
          class="input input-bordered"
          required
        />
      </div>

      <div class="form-control w-full">
        <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
        <label class="label">
          <span class="label-text">Message</span>
        </label>
        <input
          name="registrationNumber"
          [ngModel]="message()"
          (ngModelChange)="message.set($event)"
          type="text"
          placeholder="Example: Welcome to the world!"
          class="input input-bordered"
          required
        />
      </div>

      <button class="btn btn-primary my-4" [disabled]="!form.valid">
        Register
      </button>
    </form>
  `,
  styles: [],
})
export class DogsDogPostsCreateComponent implements OnChanges {
  @Input() dogId?: string;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private dogService = inject(DogService);
  private postService = inject(PostService);
  private router = inject(Router);

  title = signal('');
  message = signal('');
  createdAt = signal(new Date());
  authUser = this.authService.authUser;

  uid = computed(() => this.authUser()?.uid);
  user: WritableSignal<User | undefined> = signal(undefined);
  dog: WritableSignal<Dog | undefined> = signal(undefined);

  newPost = computed(() => {
    return {
      title: this.title(),
      message: this.message(),
      createdAt: this.createdAt(),
      dogId: this.dogId,
      userId: this.uid(),
    };
  });

  constructor() {
    effect(() => {
      if (this.dogId) {
        this.dogService.getDog(this.dogId).then((dog) => {
          this.dog.set(dog);
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
  }

  async handleSubmit() {
    this.createdAt.set(new Date());
    console.log(this.newPost());
    if (!this.dogId) {
      return;
    }
    const newPost = this.newPost();
    if (!newPost.userId || !newPost.dogId) {
      return;
    }
    const post = await this.postService.createPost(this.dogId, newPost);
    if (!post) {
      return;
    }
    this.router.navigate([`/dogs/${this.dogId}/posts/${post.id}`]);
  }
}
