import { render } from '@testing-library/angular';
import { AvatarWithTooltipComponent } from './avatar-with-tooltip.component';

describe('AvatarWithTooltipComponent', () => {
  it('should create', async () => {
    const renderResult = await render(AvatarWithTooltipComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
