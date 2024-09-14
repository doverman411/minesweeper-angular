import { Component, OnInit } from '@angular/core';
import { GameLogicService } from '../../services/game-logic.service';

@Component({
  selector: 'app-flag-counter',
  standalone: true,
  imports: [],
  templateUrl: './flag-counter.component.html',
  styleUrl: './flag-counter.component.css'
})
export class FlagCounterComponent implements OnInit {
  count!: number;

  constructor(private gameLogicService: GameLogicService) {}

  ngOnInit(): void {
    this.gameLogicService.remainingFlags$.subscribe((value)=>{
      this.count = value;
    })
  }
}
