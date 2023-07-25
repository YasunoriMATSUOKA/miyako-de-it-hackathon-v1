import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { DogsDogPostsCreateComponent } from './dogs-dog-posts-create.component';

describe('DogsDogPostsCreateComponent', () => {
  let component: DogsDogPostsCreateComponent;
  let fixture: ComponentFixture<DogsDogPostsCreateComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [DogsDogPostsCreateComponent],
    });
    fixture = TestBed.createComponent(DogsDogPostsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render dogs-dog-posts-create works!', async () => {
    await render(DogsDogPostsCreateComponent);
    expect(screen.getByText('dogs-dog-posts-create works!')).toBeTruthy();
  });
});
