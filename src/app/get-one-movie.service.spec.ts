import { TestBed } from '@angular/core/testing';

import { GetOneMovieService } from './get-one-movie.service';

describe('GetOneMovieService', () => {
  let service: GetOneMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOneMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
