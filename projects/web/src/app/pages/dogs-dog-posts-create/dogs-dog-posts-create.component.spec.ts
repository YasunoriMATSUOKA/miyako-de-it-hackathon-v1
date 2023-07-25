import { render, screen } from '@testing-library/angular';
import { DogsDogPostsCreateComponent } from './dogs-dog-posts-create.component';

describe('DogsDogPostsCreateComponent', () => {
  it('should create', async () => {
    const renderResult = await render(DogsDogPostsCreateComponent);
    const fixture = renderResult.fixture;
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render dogs-dog-posts-create works!', async () => {
    await render(DogsDogPostsCreateComponent);
    expect(screen.getByText('dogs-dog-posts-create works!')).toBeTruthy();
  });
});
