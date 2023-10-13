import { TestBed } from '@angular/core/testing';

import { GetDirectorService } from './get-director.service';

describe('GetDirectorService', () => {
  let service: GetDirectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDirectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
