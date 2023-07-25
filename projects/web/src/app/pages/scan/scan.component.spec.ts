import { render, screen } from '@testing-library/angular';
import { ScanComponent } from './scan.component';

describe('ScanComponent', () => {
  it('should create', async () => {
    const renderResult = await render(ScanComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render scan works!', async () => {
    await render(ScanComponent);
    expect(screen.getByText('scan works!')).toBeTruthy();
  });
});
