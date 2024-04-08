import { Component, input, output } from '@angular/core';
import { CubeItem } from '../model/cube-item';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'cube-list-item',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  cube = input.required<CubeItem>();
  selected = output<string>();

  selectItem(cubeIri: string) {
    this.selected.emit(cubeIri);
  }
}
