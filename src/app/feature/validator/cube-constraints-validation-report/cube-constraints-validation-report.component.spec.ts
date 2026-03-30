import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CubeConstraintsValidationReportComponent } from './cube-constraints-validation-report.component';

describe('CubeConstraintsValidationReportComponent', () => {
  let component: CubeConstraintsValidationReportComponent;
  let fixture: ComponentFixture<CubeConstraintsValidationReportComponent>;

  const mockReport = {
    conforms: true,
    results: [],
    dataset: { match: () => ({ [Symbol.iterator]: () => ({ next: () => ({ done: true }) }) }) }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubeConstraintsValidationReportComponent, NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubeConstraintsValidationReportComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('report', mockReport);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
