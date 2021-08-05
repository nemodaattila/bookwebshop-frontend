import {TestBed} from '@angular/core/testing';

import {BookCriteriaDataListFillerService} from './book-criteria-data-list-filler.service';

describe('BookCriteriaDataListFillerService', () => {
  let service: BookCriteriaDataListFillerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCriteriaDataListFillerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
