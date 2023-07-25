import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { ScanComponent } from './scan.component';

describe('ScanComponent', () => {
  let component: ScanComponent;
  let fixture: ComponentFixture<ScanComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [ScanComponent],
    });
    fixture = TestBed.createComponent(ScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render scan works!', async () => {
    await render(ScanComponent);
    expect(screen.getByText('scan works!')).toBeTruthy();
  });
});
