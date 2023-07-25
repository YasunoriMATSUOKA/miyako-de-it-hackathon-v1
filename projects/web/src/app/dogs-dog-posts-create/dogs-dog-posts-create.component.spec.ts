import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsDogPostsCreateComponent } from './dogs-dog-posts-create.component';

describe('DogsDogPostsCreateComponent', () => {
  let component: DogsDogPostsCreateComponent;
  let fixture: ComponentFixture<DogsDogPostsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DogsDogPostsCreateComponent]
    });
    fixture = TestBed.createComponent(DogsDogPostsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
