import {TestBed} from '@angular/core/testing';

import {GlobalMessageDiplayerService} from './global-message-diplayer.service';

describe('GlobalMessageDiplayerService', () => {
  let service: GlobalMessageDiplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalMessageDiplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
