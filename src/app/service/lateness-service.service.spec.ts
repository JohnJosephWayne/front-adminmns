import { TestBed } from '@angular/core/testing';

import { LatenessServiceService } from './lateness-service.service';

describe('LatenessServiceService', () => {
  let service: LatenessServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatenessServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
