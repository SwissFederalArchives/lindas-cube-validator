import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SparqlService } from './sparql.service';

describe('SparqlService', () => {
  let service: SparqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(SparqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
