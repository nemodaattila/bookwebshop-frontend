import {TestBed} from '@angular/core/testing';

import {DataMaintainerGuard} from './data-maintainer.guard';

describe('DataMaintainerGuard', () => {
  let guard: DataMaintainerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DataMaintainerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
