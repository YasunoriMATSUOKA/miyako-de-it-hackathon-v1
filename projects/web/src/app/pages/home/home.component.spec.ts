import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('should create', async () => {
    const renderResult = await render(HomeComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render home works!', async () => {
    await render(HomeComponent);
    expect(screen.getByText('home works!')).toBeTruthy();
  });
});
