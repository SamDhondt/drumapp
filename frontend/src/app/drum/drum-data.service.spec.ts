import { TestBed, inject } from '@angular/core/testing';

import { DrumDataService } from './drum-data.service';

describe('DrumDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrumDataService]
    });
  });

  it('should be created', inject([DrumDataService], (service: DrumDataService) => {
    expect(service).toBeTruthy();
  }));
});
