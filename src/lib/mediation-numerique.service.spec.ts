import { TestBed } from '@angular/core/testing';

import { MediationNumeriqueService } from './mediation-numerique.service';

describe('MediationNumeriqueService', () => {
  let service: MediationNumeriqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediationNumeriqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
