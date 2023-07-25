import { render } from '@testing-library/angular';
import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  it('should create', async () => {
    const renderResult = await render(DrawerComponent, {
      componentProperties: {
        title: 'Navbar Title',
        name: 'Avatar Name',
        imageUrl:
          'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
      },
    });
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
