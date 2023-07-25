import { AppComponent } from './app.component';
import { render } from '@testing-library/angular';
import { RouterOutlet } from '@angular/router';
import { DrawerComponent } from './ui/drawer/drawer.component';

describe('AppComponent', () => {
  it('should create the app', async () => {
    const renderResult = await render(AppComponent, {
      imports: [RouterOutlet, DrawerComponent],
    });
    const fixture = renderResult.fixture;
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Proof of Pedigree' title`, async () => {
    const renderResult = await render(AppComponent, {
      imports: [RouterOutlet, DrawerComponent],
    });
    const fixture = renderResult.fixture;
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Proof of Pedigree');
  });
});
