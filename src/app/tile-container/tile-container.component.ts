import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tile-container',
  standalone: true,
  imports: [TileComponent, CommonModule],
  templateUrl: './tile-container.component.html',
  styleUrl: './tile-container.component.css'
})
export class TileContainerComponent implements OnInit, OnDestroy {
  @Input() width!: number;
  @Input() height!: number;
  @Input() numMines!: number;
  @Input() started!: boolean;
  @Input() stopped!: boolean;
  @Input() resetEventIn!: Observable<void>;
  @Output() startEventOut = new EventEmitter<void>();
  @Output() stopEventOut = new EventEmitter<void>();
  @Output() flagEvent = new EventEmitter<boolean>();
  private resetEventSubscription!: Subscription;
  
  tiles : Array<any> = [];
  ngOnInit(): void {
    this.resetEventSubscription = this.resetEventIn.subscribe(()=>this.reset())
    this.initializeTiles();
  }
  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }
  start() {
    this.started = true;
    this.stopped = false;
    console.log('emitting gameStart2')
    this.startEventOut.emit();
  }
  stop() {
    this.stopped = true;
    this.stopEventOut.emit();
  }
  reset() {
    this.started = false;
    this.stopped = false;
    this.initializeTiles();
  }
  initializeTiles() {
    this.tiles = [];
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
  updateFlagCount(isFlagged: boolean) {
    this.flagEvent.emit(isFlagged);
  }
}
