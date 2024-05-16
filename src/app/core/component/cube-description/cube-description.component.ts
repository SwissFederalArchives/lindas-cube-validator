import { ChangeDetectionStrategy, Component, DestroyRef, Signal, inject, input, output, signal } from '@angular/core';
import { CubeDefinition } from '../../model/cube-definition/cube-definition';

import { MatIconModule } from '@angular/material/icon';

import { ObExternalLinkModule, ObLanguageService } from '@oblique/oblique';
import { map, take } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FadeInOut } from '../../animation/fade-in-out';
import { ProfileSelectorComponent } from "../profile-selector/profile-selector.component";
import { ValidationProfile } from '../../constant/validation-profile';


@Component({
  selector: 'cube-cube-description',
  standalone: true,
  templateUrl: './cube-description.component.html',
  styleUrl: './cube-description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FadeInOut(300, 200)],
  imports: [MatIconModule, ObExternalLinkModule, ProfileSelectorComponent]
})
export class CubeDescriptionComponent {
  cube = input.required<CubeDefinition | undefined>();
  selectedProfileIri = input.required<string | undefined | null>();
  profileSelected = output<ValidationProfile>();

  emitProfileSelected(profile: ValidationProfile) {
    this.profileSelected.emit(profile);
  }
}
