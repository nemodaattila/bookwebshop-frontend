import {TestBed} from '@angular/core/testing';

import {VariableHelperService} from './variable-helper.service';

describe('VariableHelperService', () => {
  let service: VariableHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
