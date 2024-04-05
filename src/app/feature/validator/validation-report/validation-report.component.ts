import { Component, input } from '@angular/core';
import { ValidationReport } from 'rdf-validate-shacl/src/validation-report';

@Component({
  selector: 'cube-validation-report',
  standalone: true,
  imports: [],
  templateUrl: './validation-report.component.html',
  styleUrl: './validation-report.component.scss'
})
export class ValidationReportComponent {
  report = input.required<ValidationReport>();

}
