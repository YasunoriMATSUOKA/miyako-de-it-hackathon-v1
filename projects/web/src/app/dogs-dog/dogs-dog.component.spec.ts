import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { DogsDogComponent } from './dogs-dog.component';

describe('DogsDogComponent', () => {
  let component: DogsDogComponent;
  let fixture: ComponentFixture<DogsDogComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [DogsDogComponent],
    });
    fixture = TestBed.createComponent(DogsDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render dogs-dog works!', async () => {
    await render(DogsDogComponent);
    expect(screen.getByText('dogs-dog works!')).toBeTruthy();
  });
});
