import { Component, computed, effect, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import ValidationReport from 'rdf-validate-shacl/src/validation-report';
import { rdfEnvironment } from '../../../core/rdf/rdf-environment';
import { SeverityComponent } from "../severity/severity.component";
import { rdf, sh } from '../../../core/rdf/namespace';
import { ValidationResult } from '../validation-report/model/validation-result';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ObButtonModule, ObIconModule } from '@oblique/oblique';
import { MatButtonModule } from '@angular/material/button';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'cube-constraints-validation-report',
  standalone: true,
  templateUrl: './cube-constraints-validation-report.component.html',
  styleUrl: './cube-constraints-validation-report.component.scss',
  imports: [SeverityComponent, MatTableModule, MatIconModule, ObIconModule, MatButtonModule, ObButtonModule, MatExpansionModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CubeConstraintsValidationReportComponent {
  report = input.required<ValidationReport>();


  cubeColumnsToDisplay = ['Path', 'Message', 'Value', 'Severity'];

  dimensionColumnsToDisplay = ['Dimension', 'Message', 'Severity'];

  dimensionColumnsToDisplayWithExpand = [...this.dimensionColumnsToDisplay, 'expand'];
  expandedElement: ValidationResult | null = null;


  cubeValidationResult = computed<ValidationResult[]>(() => {
    const dataset = this.report().dataset;
    if (!dataset) {
      return [];
    }

    const results = rdfEnvironment.clownface({ dataset }).node(sh['ValidationResult']).in(rdf['type']).map(n => new ValidationResult(n)).filter(result => result.isAboutCube());

    const resultWithDetails = results.flatMap(result => [result, ...result.detail]);
    return resultWithDetails;
  }
  );

  dimensionValidationResult = computed<ValidationResult[]>(() => {
    const dataset = this.report().dataset;
    if (!dataset) {
      return [];
    }

    const results = rdfEnvironment.clownface({ dataset }).node(sh['ValidationResult']).in(rdf['type']).map(n => new ValidationResult(n)).filter(result => result.isAboutDimensions());
    const resultWithDetails = results.flatMap(result => [result, ...result.detail]);
    return resultWithDetails;
  }
  );

}




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}