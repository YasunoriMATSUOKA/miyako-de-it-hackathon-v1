import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'auth/reset-password',
    loadComponent: () =>
      import('./pages/auth-reset-password/auth-reset-password.component').then(
        (m) => m.AuthResetPasswordComponent,
      ),
  },
  {
    path: 'auth/sign-in',
    loadComponent: () =>
      import('./pages/auth-sign-in/auth-sign-in.component').then(
        (m) => m.AuthSignInComponent,
      ),
  },
  {
    path: 'auth/sign-up',
    loadComponent: () =>
      import('./pages/auth-sign-up/auth-sign-up.component').then(
        (m) => m.AuthSignUpComponent,
      ),
  },
  {
    path: 'dogs/create',
    loadComponent: () =>
      import('./pages/dogs-create/dogs-create.component').then(
        (m) => m.DogsCreateComponent,
      ),
  },
  {
    path: 'dogs/:dogId',
    loadComponent: () =>
      import('./pages/dogs-dog/dogs-dog.component').then(
        (m) => m.DogsDogComponent,
      ),
  },
  {
    path: 'dogs/:dogId/posts/create',
    loadComponent: () =>
      import(
        './pages/dogs-dog-posts-create/dogs-dog-posts-create.component'
      ).then((m) => m.DogsDogPostsCreateComponent),
  },
  {
    path: 'dogs/:dogId/posts/:postId',
    loadComponent: () =>
      import('./pages/dogs-dog-posts-post/dogs-dog-posts-post.component').then(
        (m) => m.DogsDogPostsPostComponent,
      ),
  },
  {
    path: 'dogs/:dogId/posts',
    loadComponent: () =>
      import('./pages/dogs-dog-posts/dogs-dog-posts.component').then(
        (m) => m.DogsDogPostsComponent,
      ),
  },
  {
    path: 'scan',
    loadComponent: () =>
      import('./pages/scan/scan.component').then((m) => m.ScanComponent),
  },
];
