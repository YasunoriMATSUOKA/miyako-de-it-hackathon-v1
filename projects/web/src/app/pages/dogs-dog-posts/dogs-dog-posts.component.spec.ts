import { render, screen } from '@testing-library/angular';
import { DogsDogPostsComponent } from './dogs-dog-posts.component';

describe('DogsDogPostsComponent', () => {
  it('should create', async () => {
    const renderResult = await render(DogsDogPostsComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render dogs-dog-posts works!', async () => {
    await render(DogsDogPostsComponent);
    expect(screen.getByText('dogs-dog-posts works!')).toBeTruthy();
  });
});
