import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAccueilComponent } from './video-accueil.component';

describe('VideoAccueilComponent', () => {
  let component: VideoAccueilComponent;
  let fixture: ComponentFixture<VideoAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoAccueilComponent]
    });
    fixture = TestBed.createComponent(VideoAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
