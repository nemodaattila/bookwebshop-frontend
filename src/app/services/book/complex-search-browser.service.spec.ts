import {TestBed} from '@angular/core/testing';

import {ComplexSearchBrowserService} from './complex-search-browser.service';

describe('ComplexSearchBrowserService', () => {
  let service: ComplexSearchBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplexSearchBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
