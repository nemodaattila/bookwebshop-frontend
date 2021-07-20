import { TestBed } from '@angular/core/testing';

import { LocalLibraryService } from './local-library.service';

describe('LocalLibraryService', () => {
  let service: LocalLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
