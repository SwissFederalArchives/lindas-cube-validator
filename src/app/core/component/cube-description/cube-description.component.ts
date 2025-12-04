import { ChangeDetectionStrategy, Component, DestroyRef, Signal, computed, inject, input, output, signal } from '@angular/core';
import { CubeDefinition } from '../../model/cube-definition/cube-definition';

import { MatIconModule } from '@angular/material/icon';

import { ObExternalLinkModule } from '@oblique/oblique';
import { TranslateService } from '@ngx-translate/core';
import { map, startWith } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FadeInOut } from '../../animation/fade-in-out';
import { ProfileSelectorComponent } from "../profile-selector/profile-selector.component";
import { ValidationProfile } from '../../constant/validation-profile';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'cube-cube-description',
    templateUrl: './cube-description.component.html',
    styleUrl: './cube-description.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [FadeInOut(300, 200)],
    imports: [
        MatIconModule,
        ObExternalLinkModule,
        ProfileSelectorComponent,
        JsonPipe
    ]
})
export class CubeDescriptionComponent {
  cube = input.required<CubeDefinition | undefined>();
  selectedProfile = input.required<ValidationProfile | undefined | null>();
  profileSelected = output<ValidationProfile>();

  readonly #translateService = inject(TranslateService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #language: Signal<string>;

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

  constructor() {
    const currentLang = this.#translateService.currentLang?.split('-')[0] ?? 'de';
    this.#language = toSignal(
      this.#translateService.onLangChange.pipe(
        takeUntilDestroyed(this.#destroyRef),
        map(event => event.lang.split('-')[0] ?? 'de'),
        startWith(currentLang)
      ),
      { requireSync: true }
    );
  }


  emitProfileSelected(profile: ValidationProfile) {
    this.profileSelected.emit(profile);
  }
}
