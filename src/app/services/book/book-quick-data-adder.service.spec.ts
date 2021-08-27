import {TestBed} from '@angular/core/testing';

import {BookDataHandlerService} from './book-data-handler.service';

describe('BookQuickDataAdderService', () => {
  let service: BookDataHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDataHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
