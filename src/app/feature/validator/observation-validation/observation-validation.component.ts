import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { ObSpinnerModule, ObSpinnerService } from '@oblique/oblique';
import { EndpointService } from '../../../core/service/endpoint/endpoint.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import ValidationReport from 'rdf-validate-shacl/src/validation-report';

import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ObButtonModule } from '@oblique/oblique';

import { ValidationReportComponent } from "../validation-report/validation-report.component";
import { FadeInOut } from '../../../core/animation/fade-in-out';
import { ConformsIndicatorComponent } from '../conforms-indicator/conforms-indicator.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cube-observation-validation',
  standalone: true,
  templateUrl: './observation-validation.component.html',
  styleUrl: './observation-validation.component.scss',
  imports: [
    ObSpinnerModule,
    ValidationReportComponent,
    ConformsIndicatorComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ObButtonModule,
    TranslateModule
  ],
  animations: [FadeInOut(300, 200)],
})
export class ObservationValidationComponent {
  cubeIri = input.required<string>();
  endpoint = input.required<string>();

  private readonly spinnerService = inject(ObSpinnerService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly endpointService = inject(EndpointService);
  private readonly dialog = inject(MatDialog);

  report = signal<ValidationReport | null>(null);
  conforms = signal<boolean>(true);
  isLoading = signal<boolean>(true);

  private _report: ValidationReport | null = null;
  private readonly _reports: ValidationReport[] = [];

  constructor() {
    effect(() => {
      const cubeIri = this.cubeIri();
      const endpoint = this.endpoint();

      if (!cubeIri || !endpoint) {
        return;
      }
      this.isLoading.set(true);
      this.spinnerService.activate('observation-validator');

      this.endpointService.getObservationValidationJunkedReport(endpoint, cubeIri, 10).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(
        {
          next: (junkedReport) => {
            if (junkedReport.conforms) {
              return;
            }

            if (this._report === null) {
              this._report = junkedReport;
            }
            this._reports.push(junkedReport);
          },
          error: (error) => {
            console.error(error);
            this.spinnerService.deactivate('observation-validator');

          },
          complete: () => {
            this.isLoading.set(false);
            this.spinnerService.deactivate('observation-validator');

            if (!this._report) {
              this.conforms.set(true);
              return;
            }

            this._report?.results.push(...this._reports.flatMap((report) => report.results));
            this.report.set(this._report);
            this.conforms.set(false);
          }
        }
      );
    }, { allowSignalWrites: true });

  }


  openDialog(): void {
    this.dialog.open(DialogElementsExampleDialog);
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './describe-observation-validation.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    TranslateModule],
})
export class DialogElementsExampleDialog { }