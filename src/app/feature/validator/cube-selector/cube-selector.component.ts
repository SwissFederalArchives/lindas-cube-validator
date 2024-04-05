import { Component, inject } from '@angular/core';
import { ValidatorInputComponent } from "../validator-input/validator-input.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cube-validator',
  standalone: true,
  templateUrl: './cube-selector.component.html',
  styleUrl: './cube-selector.component.scss',
  imports: [ValidatorInputComponent]
})
export class CubeSelectorComponent {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  validateCube(cube: CubeInfo) {

    this.router.navigate(['./', cube.endpoint, cube.cubeIri], { relativeTo: this.route });
  }
}

export interface CubeInfo {
  cubeIri: string;
  endpoint: string;
}

