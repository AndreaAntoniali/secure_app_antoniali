import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminComponentGuard } from './admin-component-guard';

describe('adminComponentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminComponentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
