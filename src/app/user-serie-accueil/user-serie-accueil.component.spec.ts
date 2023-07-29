import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSerieAccueilComponent } from './user-serie-accueil.component';

describe('UserSerieAccueilComponent', () => {
  let component: UserSerieAccueilComponent;
  let fixture: ComponentFixture<UserSerieAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSerieAccueilComponent]
    });
    fixture = TestBed.createComponent(UserSerieAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
