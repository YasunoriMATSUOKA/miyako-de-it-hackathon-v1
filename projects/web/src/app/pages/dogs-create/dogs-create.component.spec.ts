import { render, screen } from '@testing-library/angular';
import { DogsCreateComponent } from './dogs-create.component';

describe('DogsCreateComponent', () => {
  it('should create', async () => {
    const renderResult = await render(DogsCreateComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render dogs-create works!', async () => {
    await render(DogsCreateComponent);
    expect(screen.getByText('dogs-create works!')).toBeTruthy();
  });
});
