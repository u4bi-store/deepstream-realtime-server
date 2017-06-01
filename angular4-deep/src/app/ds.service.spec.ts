import { TestBed, inject } from '@angular/core/testing';

import { DsService } from './ds.service';

describe('DsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DsService]
    });
  });

  it('should ...', inject([DsService], (service: DsService) => {
    expect(service).toBeTruthy();
  }));
});
