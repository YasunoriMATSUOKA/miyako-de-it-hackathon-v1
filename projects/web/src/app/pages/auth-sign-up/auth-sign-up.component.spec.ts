import { render, screen } from '@testing-library/angular';
import { AuthSignUpComponent } from './auth-sign-up.component';

describe('AuthSignUpComponent', () => {
  it('should create', async () => {
    const renderResult = await render(AuthSignUpComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render auth-sign-up works!', async () => {
    await render(AuthSignUpComponent);
    expect(screen.getByText('auth-sign-up works!')).toBeTruthy();
  });
});
