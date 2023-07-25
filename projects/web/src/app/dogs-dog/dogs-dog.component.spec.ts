import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsDogComponent } from './dogs-dog.component';

describe('DogsDogComponent', () => {
  let component: DogsDogComponent;
  let fixture: ComponentFixture<DogsDogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DogsDogComponent]
    });
    fixture = TestBed.createComponent(DogsDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
