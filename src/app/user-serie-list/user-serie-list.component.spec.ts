import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSerieListComponent } from './user-serie-list.component';

describe('UserSerieListComponent', () => {
  let component: UserSerieListComponent;
  let fixture: ComponentFixture<UserSerieListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSerieListComponent]
    });
    fixture = TestBed.createComponent(UserSerieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
