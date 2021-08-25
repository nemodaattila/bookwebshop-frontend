import {TestBed} from '@angular/core/testing';

import {BookDataAdderService} from './book-data-adder.service';

describe('BookQuickDataAdderService', () => {
  let service: BookDataAdderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDataAdderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
