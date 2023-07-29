import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignOutComponent } from './auth-sign-out.component';

describe('AuthSignOutComponent', () => {
  let component: AuthSignOutComponent;
  let fixture: ComponentFixture<AuthSignOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthSignOutComponent]
    });
    fixture = TestBed.createComponent(AuthSignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
