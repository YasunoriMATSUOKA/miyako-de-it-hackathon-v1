import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsCreateComponent } from './dogs-create.component';

describe('DogsCreateComponent', () => {
  let component: DogsCreateComponent;
  let fixture: ComponentFixture<DogsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DogsCreateComponent]
    });
    fixture = TestBed.createComponent(DogsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
