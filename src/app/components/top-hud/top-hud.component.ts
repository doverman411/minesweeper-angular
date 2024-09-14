import { Component } from '@angular/core';
import { FlagCounterComponent } from '../flag-counter/flag-counter.component';
import { GameButtonComponent } from '../game-button/game-button.component';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-top-hud',
  standalone: true,
  imports: [FlagCounterComponent, GameButtonComponent, TimerComponent],
  templateUrl: './top-hud.component.html',
  styleUrl: './top-hud.component.css'
})
export class TopHudComponent {}
