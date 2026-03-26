import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ValidationReportComponent } from './validation-report.component';

describe('ValidationReportComponent', () => {
  let component: ValidationReportComponent;
  let fixture: ComponentFixture<ValidationReportComponent>;

  const mockReport = {
    conforms: true,
    results: [],
    dataset: { match: () => ({ [Symbol.iterator]: () => ({ next: () => ({ done: true }) }) }) }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationReportComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationReportComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('report', mockReport);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
