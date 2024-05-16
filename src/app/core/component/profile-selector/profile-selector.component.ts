import { JsonPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ObFormFieldModule } from '@oblique/oblique';
import { ValidationProfile } from '../../constant/validation-profile';


@Component({
  selector: 'cube-profile-selector',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ObFormFieldModule,
  ],
  templateUrl: './profile-selector.component.html',
  styleUrl: './profile-selector.component.scss'
})
export class ProfileSelectorComponent {
  profiles = input.required<ValidationProfile[]>();
  selectedProfileIri = input<string | undefined | null>(undefined);
  profileSelected = output<ValidationProfile>();

  selectionChanged(event: MatSelectChange): void {
    // find the profile by value
    const profile = this.profiles().find(p => p.value === event.value);
    if (profile) {
      this.profileSelected.emit(profile);
      return;
    }
  }
}
