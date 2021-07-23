import { TestBed } from '@angular/core/testing';

import { HttpAuthenticationInterceptor } from './http-authentication.interceptor';

describe('HttpAuthenticationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpAuthenticationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpAuthenticationInterceptor = TestBed.inject(HttpAuthenticationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
