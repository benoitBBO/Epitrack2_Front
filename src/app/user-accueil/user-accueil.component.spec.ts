import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccueilComponent } from './user-accueil.component';

describe('UserAccueilComponent', () => {
  let component: UserAccueilComponent;
  let fixture: ComponentFixture<UserAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccueilComponent]
    });
    fixture = TestBed.createComponent(UserAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
