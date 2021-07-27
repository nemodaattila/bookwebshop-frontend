import {TestBed} from '@angular/core/testing';

import {GlobalMessageDisplayerService} from './global-message-displayer.service';

describe('GlobalMessageDisplayerService', () => {
  let service: GlobalMessageDisplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalMessageDisplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
