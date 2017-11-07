import { TestBed, inject } from '@angular/core/testing';

import { FutarService } from './futar.service';

describe('FutarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FutarService]
    });
  });

  it('should be created', inject([FutarService], (service: FutarService) => {
    expect(service).toBeTruthy();
  }));
});
