import { render, screen } from '@testing-library/angular';
import { DogsDogComponent } from './dogs-dog.component';

describe('DogsDogComponent', () => {
  it('should create', async () => {
    const renderResult = await render(DogsDogComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render dogs-dog works!', async () => {
    await render(DogsDogComponent);
    expect(screen.getByText('dogs-dog works!')).toBeTruthy();
  });
});
