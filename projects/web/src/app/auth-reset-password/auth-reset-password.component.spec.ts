import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { AuthResetPasswordComponent } from './auth-reset-password.component';

describe('AuthResetPasswordComponent', () => {
  let component: AuthResetPasswordComponent;
  let fixture: ComponentFixture<AuthResetPasswordComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [AuthResetPasswordComponent],
    });
    fixture = TestBed.createComponent(AuthResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render auth-reset-password works!', async () => {
    await render(AuthResetPasswordComponent);
    expect(screen.getByText('auth-reset-password works!')).toBeTruthy();
  });
});
