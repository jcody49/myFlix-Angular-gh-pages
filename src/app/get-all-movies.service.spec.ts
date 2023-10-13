import { TestBed } from '@angular/core/testing';

import { GetAllMoviesService } from './get-all-movies.service';

describe('GetAllMoviesService', () => {
  let service: GetAllMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
