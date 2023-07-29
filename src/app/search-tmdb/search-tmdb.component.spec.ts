import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTMDBComponent } from './search-tmdb.component';

describe('SearchTMDBComponent', () => {
  let component: SearchTMDBComponent;
  let fixture: ComponentFixture<SearchTMDBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTMDBComponent]
    });
    fixture = TestBed.createComponent(SearchTMDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
