import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAccueilComponent } from './movie-accueil.component';

describe('MovieAccueilComponent', () => {
  let component: MovieAccueilComponent;
  let fixture: ComponentFixture<MovieAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieAccueilComponent]
    });
    fixture = TestBed.createComponent(MovieAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
