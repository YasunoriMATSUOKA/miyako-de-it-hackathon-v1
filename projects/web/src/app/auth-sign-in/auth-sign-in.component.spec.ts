import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { AuthSignInComponent } from './auth-sign-in.component';

describe('AuthSignInComponent', () => {
  let component: AuthSignInComponent;
  let fixture: ComponentFixture<AuthSignInComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [AuthSignInComponent],
    });
    fixture = TestBed.createComponent(AuthSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render auth-sign-in works!', async () => {
    await render(AuthSignInComponent);
    expect(screen.getByText('auth-sign-in works!')).toBeTruthy();
  });
});
