import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'dogs/create',
    loadComponent: () =>
      import('./dogs-create/dogs-create.component').then(
        (m) => m.DogsCreateComponent,
      ),
  },
  {
    path: 'dogs/:dogId',
    loadComponent: () =>
      import('./dogs-dog/dogs-dog.component').then((m) => m.DogsDogComponent),
  },
  {
    path: 'dogs/:dogId/posts/create',
    loadComponent: () =>
      import('./dogs-dog-posts-create/dogs-dog-posts-create.component').then(
        (m) => m.DogsDogPostsCreateComponent,
      ),
  },
  {
    path: 'dogs/:dogId/posts/:postId',
    loadComponent: () =>
      import('./dogs-dog-posts-post/dogs-dog-posts-post.component').then(
        (m) => m.DogsDogPostsPostComponent,
      ),
  },
  {
    path: 'dogs/:dogId/posts',
    loadComponent: () =>
      import('./dogs-dog-posts/dogs-dog-posts.component').then(
        (m) => m.DogsDogPostsComponent,
      ),
  },
  {
    path: 'scan',
    loadComponent: () =>
      import('./scan/scan.component').then((m) => m.ScanComponent),
  },
];
