import {TestBed} from '@angular/core/testing';

import {AuthenticationNotLoggedGuard} from './authentication-not-logged.guard';

describe('AuthenticationNotLoggedGuard', () => {
  let guard: AuthenticationNotLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticationNotLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
