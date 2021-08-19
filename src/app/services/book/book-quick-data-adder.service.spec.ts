import {TestBed} from '@angular/core/testing';

import {BookQuickDataAdderService} from './book-quick-data-adder.service';

describe('BookQuickDataAdderService', () => {
  let service: BookQuickDataAdderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookQuickDataAdderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
