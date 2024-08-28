import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tile-container',
  standalone: true,
  imports: [TileComponent, CommonModule],
  templateUrl: './tile-container.component.html',
  styleUrl: './tile-container.component.css'
})
export class TileContainerComponent implements OnInit {
  @Input() width = 5;
  @Input() height = 10;
  @Input() started = false;
  @Input() ended = false;
  @Output() gameStarted = new EventEmitter<void>();
  @Output() gameOver = new EventEmitter<void>();
  tiles : Array<any> = [];
  ngOnInit(): void {
    for (let r=0; r<this.height;++r) {
      this.tiles.push({
        id: r,
        row: [] 
      });
      for (let c=0; c<this.width;++c) {
        this.tiles[r].row.push({
          id: r*this.width + c,
          hasMine: false,
          number: 0
        });
      }
    }
    this.tiles[0].row[0].hasMine = true;
    this.tiles[1].row[1].hasMine = true;
  }
  start() {
    this.started = true;
    this.ended = false;
    console.log('emitting gameStart2')
    this.gameStarted.emit();
  }
  handleGameOver() {
    this.ended = true;
    this.gameOver.emit();
  }
}
