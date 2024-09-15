import { Component, OnInit } from '@angular/core';
import { GameLogicService } from '../../services/game-logic.service';

@Component({
  selector: 'app-game-button',
  standalone: true,
  imports: [],
  templateUrl: './game-button.component.html',
  styleUrl: './game-button.component.css'
})
export class GameButtonComponent implements OnInit {
  stopped!: boolean;
  hasWon!: boolean;
  sweeping!: boolean;

  constructor(private gameLogicService: GameLogicService) {}

  ngOnInit(): void {
    this.gameLogicService.stopped$.subscribe((value) => {
      this.stopped = value;
    });
    this.gameLogicService.hasWon$.subscribe((value) => {
      this.hasWon = value;
    });
    this.gameLogicService.sweeping$.subscribe((value) => {
      this.sweeping = value;
    });
  }

  handleClick() {
    this.gameLogicService.reset();
  }
}
