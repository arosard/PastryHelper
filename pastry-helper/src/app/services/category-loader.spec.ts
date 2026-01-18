import { TestBed } from '@angular/core/testing';

import { CategoryLoader } from './category-loader';

describe('CategoryLoader', () => {
  let service: CategoryLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
