import { TestBed } from '@angular/core/testing';

import { SharedProductsService } from './shared-products.service';

describe('SharedProductsService', () => {
  let service: SharedProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
