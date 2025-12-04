import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ObIconModule } from '@oblique/oblique';

@Component({
    selector: 'cube-conforms-indicator',
    imports: [
        MatIconModule,
        ObIconModule,
    ],
    templateUrl: './conforms-indicator.component.html',
    styleUrl: './conforms-indicator.component.scss'
})
export class ConformsIndicatorComponent {
  conforms = input.required<boolean>();
}
