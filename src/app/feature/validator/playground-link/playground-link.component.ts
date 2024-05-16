import { Component, input } from '@angular/core';

import { ObExternalLinkModule } from '@oblique/oblique';

@Component({
  selector: 'cube-playground-link',
  standalone: true,
  imports: [ObExternalLinkModule],
  templateUrl: './playground-link.component.html',
  styleUrl: './playground-link.component.scss'
})
export class PlaygroundLinkComponent {
  playgroundLink = input.required<string | undefined>();
}
