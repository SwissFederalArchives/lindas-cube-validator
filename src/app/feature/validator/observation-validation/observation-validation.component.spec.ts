import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ObservationValidationComponent } from './observation-validation.component';

describe('ObservationValidationComponent', () => {
  let component: ObservationValidationComponent;
  let fixture: ComponentFixture<ObservationValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservationValidationComponent, TranslateModule.forRoot(), NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationValidationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cubeIri', 'https://example.org/cube/1');
    fixture.componentRef.setInput('endpoint', 'https://example.org/query');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
