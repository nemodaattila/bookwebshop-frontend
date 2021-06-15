import { TestBed } from '@angular/core/testing';

import { ServiceParentService } from './service-parent.service';

describe('ServiceParentService', () => {
  let service: ServiceParentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceParentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
