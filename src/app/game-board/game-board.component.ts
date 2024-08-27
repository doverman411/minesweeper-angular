import { Component } from '@angular/core';

import { TileContainerComponent } from '../tile-container/tile-container.component';
import { TopHudComponent } from '../top-hud/top-hud.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [TileContainerComponent, TopHudComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent {
  
}
