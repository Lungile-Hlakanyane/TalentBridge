import { TestBed } from '@angular/core/testing';

import { HiredCandidateServiceService } from './hired-candidate-service.service';

describe('HiredCandidateServiceService', () => {
  let service: HiredCandidateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiredCandidateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
