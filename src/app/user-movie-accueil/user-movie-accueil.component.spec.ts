import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMovieAccueilComponent } from './user-movie-accueil.component';

describe('UserMovieAccueilComponent', () => {
  let component: UserMovieAccueilComponent;
  let fixture: ComponentFixture<UserMovieAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMovieAccueilComponent]
    });
    fixture = TestBed.createComponent(UserMovieAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
