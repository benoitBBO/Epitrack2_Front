import { TestBed } from '@angular/core/testing';

import { UserSerieService } from './user-serie.service';

describe('UserSerieService', () => {
  let service: UserSerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
