import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FlagCounterComponent } from '../flag-counter/flag-counter.component';
import { GameButtonComponent } from '../game-button/game-button.component';
import { TimerComponent } from '../timer/timer.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-hud',
  standalone: true,
  imports: [FlagCounterComponent, GameButtonComponent, TimerComponent],
  templateUrl: './top-hud.component.html',
  styleUrl: './top-hud.component.css'
})
export class TopHudComponent {
  @Input() stopped!: boolean;
  @Input() hasWon!: boolean;
  @Input() startEventIn!: Observable<void>;
  @Input() stopEventIn!: Observable<boolean>;
  @Input() resetEventIn!: Observable<void>;
  @Input() remainingFlags!: number;
  @Output() resetEventOut = new EventEmitter<void>();

  reset() {
    this.resetEventOut.emit();
  }
}
