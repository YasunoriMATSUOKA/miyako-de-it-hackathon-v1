import { render } from '@testing-library/angular';
import { MenuComponent } from './menu.component';
import { RouterLink } from '@angular/router';

describe('MenuComponent', () => {
  it('should create', async () => {
    const renderResult = await render(MenuComponent, {
      imports: [RouterLink],
    });
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
