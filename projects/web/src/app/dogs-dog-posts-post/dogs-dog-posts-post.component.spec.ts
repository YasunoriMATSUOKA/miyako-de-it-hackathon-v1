import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsDogPostsPostComponent } from './dogs-dog-posts-post.component';

describe('DogsDogPostsPostComponent', () => {
  let component: DogsDogPostsPostComponent;
  let fixture: ComponentFixture<DogsDogPostsPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DogsDogPostsPostComponent]
    });
    fixture = TestBed.createComponent(DogsDogPostsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
