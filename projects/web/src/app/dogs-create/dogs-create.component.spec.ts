import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { DogsCreateComponent } from './dogs-create.component';

describe('DogsCreateComponent', () => {
  let component: DogsCreateComponent;
  let fixture: ComponentFixture<DogsCreateComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [DogsCreateComponent],
    });
    fixture = TestBed.createComponent(DogsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render dogs-create works!', async () => {
    await render(DogsCreateComponent);
    expect(screen.getByText('dogs-create works!')).toBeTruthy();
  });
});
