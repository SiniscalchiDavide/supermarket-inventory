import { TestBed } from '@angular/core/testing';

import { Lingua } from './lingua';

describe('Lingua', () => {
  let service: Lingua;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lingua);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
