import { render, screen } from '@testing-library/angular';
import { AuthSignInComponent } from './auth-sign-in.component';

describe('AuthSignInComponent', () => {
  it('should create', async () => {
    const renderResult = await render(AuthSignInComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render auth-sign-in works!', async () => {
    await render(AuthSignInComponent);
    expect(screen.getByText('auth-sign-in works!')).toBeTruthy();
  });
});
