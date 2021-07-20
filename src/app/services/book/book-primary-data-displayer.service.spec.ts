import { TestBed } from '@angular/core/testing';

import { BookPrimaryDataDisplayerService } from './book-primary-data-displayer.service';

describe('BookPrimaryDataDisplayerService', () => {
  let service: BookPrimaryDataDisplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookPrimaryDataDisplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
