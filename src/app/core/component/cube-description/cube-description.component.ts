import { ChangeDetectionStrategy, Component, DestroyRef, Signal, computed, inject, input, output, signal } from '@angular/core';
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

  readonly #languageService = inject(ObLanguageService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #language: Signal<string | undefined>;

  constructor() {
    this.#language = toSignal<string>(this.#languageService.locale$.pipe(
      takeUntilDestroyed(this.#destroyRef),
      map(locale => locale.split('-')[0] ?? 'de')
    )
    );
  }

  cubeName = computed<string>(() => {
    const lang = this.#language() ?? 'de';
    const cube = this.cube();
    if (!cube) {
      return '';
    }
    const name = cube.name;
    const nameDE = cube.nameDE;
    const nameEN = cube.nameEN;
    const nameFR = cube.nameFR;
    const nameIT = cube.nameIT;

    switch (lang) {
      case 'de':
        return nameDE ?? name ?? nameEN ?? nameFR ?? nameIT ?? 'kein Name';
      case 'en':
        return nameEN ?? name ?? nameDE ?? nameFR ?? nameIT ?? 'no name';
      case 'fr':
        return nameFR ?? name ?? nameDE ?? nameEN ?? nameIT ?? 'pas de nom';
      case 'it':
        return nameIT ?? name ?? nameDE ?? nameEN ?? nameFR ?? 'nessun nome';
      default:
        return nameDE ?? name ?? nameEN ?? nameFR ?? nameIT ?? 'kein Name';
    }

  });

  emitProfileSelected(profile: ValidationProfile) {
    this.profileSelected.emit(profile);
  }
}
