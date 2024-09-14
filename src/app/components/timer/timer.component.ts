import { Component, OnInit } from '@angular/core';
import { GameLogicService } from '../../services/game-logic.service';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit {
  started!: boolean;
  stopped!: boolean
  timeElapsed = 0;
  CAP = 999;
  intervalID: any;

  constructor(private gameLogicService: GameLogicService) {}

  ngOnInit(): void {
    this.gameLogicService.started$.subscribe((value)=>{
      if (value === this.started) {
        return;
      }
      if (value) {
        this.start();
      } else {
        this.reset();
      }
      this.started = value;
    });
    this.gameLogicService.stopped$.subscribe((value)=>{
      if (value === this.stopped) {
        return;
      }
      if (value === true) {
        this.stop();
      }
      this.stopped = value;
    });
  }

  start() {
    this.intervalID = setInterval(()=>++this.timeElapsed,1000);
  }

  stop() {
    clearInterval(this.intervalID);
  }

  reset() {
    this.timeElapsed = 0;
    this.stop();
  }
}
