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
  width = 5;
  height = 10;
  numMines = 2;
  numFlags = 0;
  started = false;
  stopped = false;
  hasWon = false;
  startSubject: Subject<void> = new Subject<void>();
  stopSubject: Subject<boolean> = new Subject<boolean>();
  resetSubject: Subject<void> = new Subject<void>();
  get remainingFlags() {
    return this.numMines - this.numFlags;
  }

  start() {
    this.started = true;
    this.startSubject.next();
  }
  stop(hasWon: boolean) {
    this.stopped = true;
    this.hasWon = hasWon;
    this.stopSubject.next(hasWon);
  }
  reset() {
    this.numFlags = 0;
    this.started = false;
    this.stopped = false;
    this.hasWon = false;
    this.resetSubject.next();
  }
  updateFlagCount(isFlagged: boolean) {
    this.numFlags += isFlagged ? 1 : -1;
  }
}
