import { Component, Input, OnInit } from '@angular/core';
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
  @Input() isRunning = true;
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
  }
  handleGameOver() {
    this.isRunning = false;
  }
}
