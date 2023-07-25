import { render, screen } from '@testing-library/angular';
import { DogsDogPostsPostComponent } from './dogs-dog-posts-post.component';

describe('DogsDogPostsPostComponent', () => {
  it('should create', async () => {
    const renderResult = await render(DogsDogPostsPostComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render dogs-dog-posts-post works!', async () => {
    await render(DogsDogPostsPostComponent);
    expect(screen.getByText('dogs-dog-posts-post works!')).toBeTruthy();
  });
});
