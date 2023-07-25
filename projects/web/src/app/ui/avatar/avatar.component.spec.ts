import { render } from '@testing-library/angular';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  it('should create', async () => {
    const renderResult = await render(AvatarComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
