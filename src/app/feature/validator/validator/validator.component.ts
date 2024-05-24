import { ChangeDetectionStrategy, Component, DestroyRef, OnDestroy, OnInit, computed, effect, inject, input, signal } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { catchError, filter, map, of, switchMap } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';

import { ObButtonModule, ObSpinnerModule, ObSpinnerService } from '@oblique/oblique';

import { FadeInOut } from '../../../core/animation/fade-in-out';

import { ValidationReportComponent } from "../validation-report/validation-report.component";
import { CubeDescriptionComponent } from '../../../core/component/cube-description/cube-description.component';
import { CubeValidationComponent } from '../cube-validation/cube-validation.component';
import { ObservationValidationComponent } from '../observation-validation/observation-validation.component';
import { ValidationProfile } from '../../../core/constant/validation-profile';
import { EndpointService } from '../../../core/service/endpoint/endpoint.service';
import { Dataset } from '@zazuko/env/lib/DatasetExt';
import { CubeDefinition } from '../../../core/model/cube-definition/cube-definition';
import { rdfEnvironment } from '../../../core/rdf/rdf-environment';
import { Barnard59CliCommandComponent } from "../../../core/component/barnard59-cli-command/barnard59-cli-command.component";

@Component({
  standalone: true,
  templateUrl: './validator.component.html',
  styleUrl: './validator.component.scss',
  animations: [FadeInOut(300, 200)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    ObButtonModule,
    ObSpinnerModule,
    ObSpinnerModule,
    TranslateModule,
    ValidationReportComponent,
    CubeDescriptionComponent,
    CubeValidationComponent,
    ObservationValidationComponent,
    Barnard59CliCommandComponent
  ]
})
/**
 * Represents a component used for validating a cube.
 */
export class ValidatorComponent implements OnInit {
  readonly cubeIri = input.required<string>();
  readonly endpoint = input.required<string>();

  readonly tabName = signal<string>('cube');
  readonly profileIri = signal<string>('');
  readonly isCubeValidationRunning = signal<boolean>(false);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #destroyRef = inject(DestroyRef);
  readonly #endpointService = inject(EndpointService);
  readonly spinnerService = inject(ObSpinnerService);


  cubeDefinition = toSignal(
    toObservable(
      computed<CubeInfo | null>(() => {
        const endpoint = this.endpoint();
        const cubeIri = this.cubeIri();
        if (endpoint === undefined || cubeIri === undefined) {
          return null;
        }
        return {
          endpoint: endpoint,
          cubeIri: cubeIri
        };

      })).pipe(
        filter(cubeInfo => cubeInfo !== null),
        switchMap(cubeInfo => this.#endpointService.getCube(cubeInfo!.endpoint, cubeInfo!.cubeIri)),
        map(cubeResult => new CubeDefinition(rdfEnvironment.clownface({ dataset: cubeResult.dataset }).namedNode(this.cubeIri())))
      )
  );


  readonly currentTabIndex = computed<number>(() => {
    return this.#tabIndexFromName(this.tabName());
  });

  readonly cubeValidationReport = toSignal(
    toObservable(
      computed<CubeInfo | null>(() => {
        const endpoint = this.endpoint();
        const cubeIri = this.cubeIri();
        const profile = this.currentProfile();
        if (profile === null || endpoint === undefined || cubeIri === undefined) {
          return null;
        }

        return {
          endpoint: endpoint,
          cubeIri: cubeIri,
          profile: profile
        };
      })
    ).pipe(
      takeUntilDestroyed(this.#destroyRef),
      filter(cubeInfo => cubeInfo !== null),
      switchMap(cubeInfo => {
        this.spinnerService.activate('cube');
        this.isCubeValidationRunning.set(true);
        return this.#endpointService.getValidationReportForProfile(cubeInfo!.endpoint, cubeInfo!.cubeIri, cubeInfo!.profile!)
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      }),
      map(result => {
        this.spinnerService.forceDeactivate('cube');
        this.isCubeValidationRunning.set(false);
        if (result === null) {
          return null;
        }
        const reportDataset = result.report.dataset;
        // merge report graph with dataGraph
        (reportDataset as Dataset).addAll(result.dataGraph);

        // merge shape graph with report graph
        (reportDataset as Dataset).addAll(result.shapeGraph);
        return result;
      }
      ),
    ));

  currentProfile = computed<ValidationProfile | null>(() => {
    const profileIri = this.profileIri();
    const availableProfiles = this.availableProfiles();
    if (availableProfiles.length === 0) {
      return null;
    }

    const currentProfile = availableProfiles.find(p => p.value === profileIri);
    if (currentProfile === undefined) {
      return availableProfiles[0];
    }
    return currentProfile;
  }
  );

  availableProfiles = computed<ValidationProfile[]>(() => {
    const cubeDefinition = this.cubeDefinition();
    if (cubeDefinition === undefined) {
      return [];
    }
    const profiles = cubeDefinition.getAvailableValidationProfiles();

    return profiles;
  });

  ngOnInit(): void {

    this.#route.queryParams.subscribe({
      next: params => {
        const tabName = params['tab'];
        const profileIri = params['profile'];
        if (tabName !== undefined) {
          this.tabName.set(tabName);
        }

        if (profileIri !== undefined) {
          this.profileIri.set(profileIri);

        }
      }
    });
  }

  updateValidationProfile(profile: ValidationProfile): void {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.#route,
      queryParams: { profile: profile.value },
      queryParamsHandling: 'merge' // keep the old queryParams if they are not updated
    };
    this.#router.navigate(['./'], navigationExtras);

  }

  /**
   * Update the route with the new tab index.
   * 
   * @param index 
   * @returns 
   */
  changeTab(index: number): void {
    const profileIri = this.profileIri();
    const endpoint = this.endpoint();
    const cubeIri = this.cubeIri();

    if (endpoint === undefined || cubeIri === undefined) {
      this.#router.navigateByUrl('/');
      return;
    }


    this.#router.navigate(['./'], {
      relativeTo: this.#route,
      queryParams: { tab: this.#tabIndexToName(index), profile: profileIri }
    });
  }

  /**
   * Get the tab name from the tab index. This is needed to show the tab name in the URL and not an index.
   * 
   * @param index 
   * @returns the name of the tab
   */
  #tabIndexToName(index: number): string {
    switch (index) {
      case 0:
        return 'cube';
      case 1:
        return 'observation';
      default:
        return '';
    }
  }

  /**
   * Get the tab index from the tab name. This is needed to get the correct tab index from the tab URL parameter.
   * 
   * @param tab 
   * @returns the index of the tab
   */
  #tabIndexFromName(tab: string | undefined): number {
    switch (tab) {
      case 'cube':
        return 0;
      case 'observation':
        return 1;
      default:
        return 0;
    }
  }

}


interface CubeInfo {
  endpoint: string;
  cubeIri: string;
  profile?: ValidationProfile;
}