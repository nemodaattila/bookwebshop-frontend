import {TestBed} from '@angular/core/testing';

import {BookMetaDataService} from './book-meta-data.service';

describe('BookMetaDataService', () => {
  let service: BookMetaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookMetaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
