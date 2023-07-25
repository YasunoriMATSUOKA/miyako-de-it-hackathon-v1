import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { AuthSignUpComponent } from './auth-sign-up.component';

describe('AuthSignUpComponent', () => {
  let component: AuthSignUpComponent;
  let fixture: ComponentFixture<AuthSignUpComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [AuthSignUpComponent],
    });
    fixture = TestBed.createComponent(AuthSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render auth-sign-up works!', async () => {
    await render(AuthSignUpComponent);
    expect(screen.getByText('auth-sign-up works!')).toBeTruthy();
  });
});
