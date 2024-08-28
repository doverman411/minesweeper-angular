import { Component } from '@angular/core';

import { TileContainerComponent } from '../tile-container/tile-container.component';
import { TopHudComponent } from '../top-hud/top-hud.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [TileContainerComponent, TopHudComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent {
  startSubject: Subject<void> = new Subject<void>();
  stopSubject: Subject<void> = new Subject<void>();
  resetSubject: Subject<void> = new Subject<void>();

  start() {
    console.log('nexting startSubject');
    this.startSubject.next();
  }
  handleGameOver() {
    this.stopSubject.next();
  }
  reset() {
    this.resetSubject.next();
  }
}
