import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsDogPostsComponent } from './dogs-dog-posts.component';

describe('DogsDogPostsComponent', () => {
  let component: DogsDogPostsComponent;
  let fixture: ComponentFixture<DogsDogPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DogsDogPostsComponent]
    });
    fixture = TestBed.createComponent(DogsDogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
