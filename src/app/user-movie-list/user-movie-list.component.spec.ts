import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMovieListComponent } from './user-movie-list.component';

describe('UserMovieListComponent', () => {
  let component: UserMovieListComponent;
  let fixture: ComponentFixture<UserMovieListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMovieListComponent]
    });
    fixture = TestBed.createComponent(UserMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
