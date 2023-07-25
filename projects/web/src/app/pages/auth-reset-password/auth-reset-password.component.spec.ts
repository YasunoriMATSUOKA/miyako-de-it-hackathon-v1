import { render, screen } from '@testing-library/angular';
import { AuthResetPasswordComponent } from './auth-reset-password.component';

describe('AuthResetPasswordComponent', () => {
  it('should create', async () => {
    const renderResult = await render(AuthResetPasswordComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render auth-reset-password works!', async () => {
    await render(AuthResetPasswordComponent);
    expect(screen.getByText('auth-reset-password works!')).toBeTruthy();
  });
});
