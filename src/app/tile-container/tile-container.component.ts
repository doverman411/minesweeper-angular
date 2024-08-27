import { Component } from '@angular/core';

import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-tile-container',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './tile-container.component.html',
  styleUrl: './tile-container.component.css'
})
export class TileContainerComponent {

}
