import { TestBed } from '@angular/core/testing';

import { FoodLoader } from './food-loader';

describe('FoodLoader', () => {
  let service: FoodLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
