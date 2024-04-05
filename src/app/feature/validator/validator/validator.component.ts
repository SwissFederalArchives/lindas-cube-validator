import { Component, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ObButtonModule } from '@oblique/oblique';
import { TranslateModule } from '@ngx-translate/core';
import { EndpointService } from '../../../core/service/endpoint/endpoint.service';
import { Dataset } from '@zazuko/env/lib/DatasetExt';
import ValidationReport from 'rdf-validate-shacl/src/validation-report';
import { ValidationReportComponent } from "../validation-report/validation-report.component";

@Component({
  selector: 'cube-validator',
  standalone: true,
  templateUrl: './validator.component.html',
  styleUrl: './validator.component.scss',
  imports: [RouterLink, MatButtonModule, ObButtonModule, MatIconModule, TranslateModule, ValidationReportComponent]
})
export class ValidatorComponent {
  cubeIri = input.required<string>();
  endpoint = input.required<string>();

  report = signal<ValidationReport | undefined>(undefined);

  private readonly endpointService = inject(EndpointService);
  constructor() {
    effect(() => {
      const cubeIri = this.cubeIri();
      const endpoint = this.endpoint();
      this.endpointService.getValidationReport(endpoint, cubeIri).subscribe(
        {
          next: (validationReport) => {
            this.report.set(validationReport);
          },
          error: (error) => {
            console.error(error);
          }
        }
      )
        ;
    }, { allowSignalWrites: true });

  }

}
