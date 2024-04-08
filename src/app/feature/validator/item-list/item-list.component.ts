import { Component, DestroyRef, Signal, computed, inject, input, output, signal } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ObFormFieldModule, ObIconModule } from '@oblique/oblique';

import { CubeItem } from '../model/cube-item';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
  selector: 'cube-item-list',
  standalone: true,
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
  imports: [
    ReactiveFormsModule,
    MatListModule,
    MatFormField,
    MatIconModule,
    MatInputModule,
    ObIconModule,
    ObFormFieldModule,
    ListItemComponent
  ]
})
export class ItemListComponent {
  items = input.required<CubeItem[]>();
  selected = output<string>();
  private readonly destroyRef = inject(DestroyRef);

  filterTerm: Signal<string | null | undefined>;

  filteredItems = computed<CubeItem[]>(() => {
    const items = this.items();
    const filterTerm = this.filterTerm();

    if (!filterTerm || filterTerm.length < 3) {
      return items;
    }
    return this.items().filter(item => item.searchField.includes(filterTerm));
  });

  searchFormControl = new FormControl<string>('');

  constructor() {
    const observeSearchTermInput = this.searchFormControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(500),
      distinctUntilChanged(),
    );

    this.filterTerm = toSignal(observeSearchTermInput);
  }

  selectItem(iri: string) {
    this.selected.emit(iri);
  }
}
