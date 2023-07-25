import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { DogsDogPostsPostComponent } from './dogs-dog-posts-post.component';

describe('DogsDogPostsPostComponent', () => {
  let component: DogsDogPostsPostComponent;
  let fixture: ComponentFixture<DogsDogPostsPostComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [DogsDogPostsPostComponent],
    });
    fixture = TestBed.createComponent(DogsDogPostsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render dogs-dog-posts-post works!', async () => {
    await render(DogsDogPostsPostComponent);
    expect(screen.getByText('dogs-dog-posts-post works!')).toBeTruthy();
  });
});
