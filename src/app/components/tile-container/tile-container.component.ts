import { Component, OnInit } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { CommonModule } from '@angular/common';
import { GameLogicService } from '../../services/game-logic.service';

@Component({
  selector: 'app-tile-container',
  standalone: true,
  imports: [TileComponent, CommonModule],
  templateUrl: './tile-container.component.html',
  styleUrl: './tile-container.component.css'
})
export class TileContainerComponent implements OnInit {
  tiles!: any;
  get width() {
    return this.tiles[0].row.length;
  }
  get height() {
    return this.tiles.length;
  }

  constructor(private gameLogicService: GameLogicService) {}

  ngOnInit(): void {
    this.gameLogicService.tiles$.subscribe((value)=>{
      this.tiles = value;
    })
    this.gameLogicService.initializeTiles();
  }
}
