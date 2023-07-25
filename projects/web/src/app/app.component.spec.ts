import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';

describe('AppComponent', () => {
  it('should create the app', () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'web' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('web');
  });

  it('should render title', async () => {
    await render(AppComponent);
    expect(screen.getByText('web app is running!')).toBeTruthy();
  });
});
