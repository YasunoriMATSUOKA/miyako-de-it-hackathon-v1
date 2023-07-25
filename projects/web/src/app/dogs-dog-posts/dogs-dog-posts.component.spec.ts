import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { DogsDogPostsComponent } from './dogs-dog-posts.component';

describe('DogsDogPostsComponent', () => {
  let component: DogsDogPostsComponent;
  let fixture: ComponentFixture<DogsDogPostsComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [DogsDogPostsComponent],
    });
    fixture = TestBed.createComponent(DogsDogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render dogs-dog-posts works!', async () => {
    await render(DogsDogPostsComponent);
    expect(screen.getByText('dogs-dog-posts works!')).toBeTruthy();
  });
});
