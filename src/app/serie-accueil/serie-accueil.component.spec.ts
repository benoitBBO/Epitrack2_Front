import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieAccueilComponent } from './serie-accueil.component';

describe('SerieAccueilComponent', () => {
  let component: SerieAccueilComponent;
  let fixture: ComponentFixture<SerieAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SerieAccueilComponent]
    });
    fixture = TestBed.createComponent(SerieAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
