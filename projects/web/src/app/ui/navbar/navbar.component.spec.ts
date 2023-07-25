import { render } from '@testing-library/angular';
import { NavbarComponent } from './navbar.component';
import { RouterLink } from '@angular/router';

describe('NavbarComponent', () => {
  it('should create', async () => {
    const renderResult = await render(NavbarComponent, {
      imports: [RouterLink],
    });
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
