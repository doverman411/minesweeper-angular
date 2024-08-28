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
  @Input() hasWon!: boolean;
  @Input() resetEventIn!: Observable<void>;
  @Output() startEventOut = new EventEmitter<void>();
  @Output() stopEventOut = new EventEmitter<boolean>();
  @Output() flagEvent = new EventEmitter<boolean>();
  private resetEventSubscription!: Subscription;
  tilesCleared: number = 0;
  
  tiles : Array<any> = [];
  ngOnInit(): void {
    this.resetEventSubscription = this.resetEventIn.subscribe(()=>this.reset())
    this.initializeTiles();
  }
  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }
  start(tileID: any) {
    this.started = true;
    this.placeMines(tileID.row, tileID.col);
    this.startEventOut.emit();
  }
  stop(hasWon: boolean) {
    this.stopEventOut.emit(hasWon);
  }
  reset() {
    this.initializeTiles();
    this.tilesCleared = 0;
  }
  initializeTiles() {
    // creating tiles
    this.tiles = [];
    for (let r=0; r<this.height;++r) {
      this.tiles.push({
        id: r,
        row: [] 
      });
      for (let c=0; c<this.width;++c) {
        this.tiles[r].row.push({
          id: {row: r, col: c},
          hasMine: false,
          number: 0,
          hasFlag: false,
          isSwept: false
        });
      }
    }
  }
  placeMines(row: number, col: number) {
    let pool = [];
    for (let r=0; r<this.height;++r) {
      for (let c=0; c<this.width; ++c) {
        if (!(r == row && c == col)) {
          pool.push({row: r, col: c});
        }
      }
    }
    // placing mines
    for (let i=0; i<this.numMines;++i) {
      let randomIndex = Math.floor(Math.random() * pool.length);
      let coordinate = pool[randomIndex];
      this.tiles[coordinate.row].row[coordinate.col].hasMine = true;
      pool.splice(randomIndex,1);
      for(let tile of this.tilesAround(coordinate)) {
        ++tile.number;
      }
    }
  }
  handleFlag(data: any) {
    let row = data.tileID.row;
    let col = data.tileID.col;
    this.tiles[row].row[col].hasFlag = data.hasFlag;
    this.flagEvent.emit(data.hasFlag);
  }
  tilesAround(coordinate:any) {
    let ret = []
    let row = coordinate.row;
    let col = coordinate.col;
    for(let r=row-1;r<=row+1;++r) {
      for(let c=col-1;c<=col+1;++c) {
        if (this.validCoordinate(r,c) && !(r==row && c==col)) {
          ret.push(this.tiles[r].row[c]);
        }
      }
    }
    return ret;
  }
  validCoordinate(row: number, col: number) {
    return 0 <= row && row < this.height && 0 <= col && col < this.width;
  }
  handleTileClick(tileID: any) {
    let tile = this.tiles[tileID.row].row[tileID.col];
    if (tile.hasFlag || this.stopped ) return;
    if (tile.isSwept) {
      this.chord(tile);
    } else {
      this.sweep(tile);
    }
  }
  chord(tile: any) {
    let tilesAround = this.tilesAround(tile.id);
    if (tilesAround.filter((t: any)=>t.hasFlag).length == tile.number) {
      for(const tile of tilesAround.filter((t: any)=>!t.hasFlag)) {
        this.sweep(tile);
      }
    }
  }
  sweep(tile: any) {
    if (tile.isSwept || tile.hasFlag || this.stopped) return; 
    tile.isSwept = true;
    ++this.tilesCleared;
    if (!this.started) {
      this.start(tile.id);
    }
    if (tile.hasMine && !this.stopped) {
      this.stop(false);
      return;
    }
    if (this.tilesCleared == this.width * this.height - this.numMines) {
      this.stop(true);
      return;
    }
    if (tile.number == 0) {
      for (let tileAround of this.tilesAround(tile.id)) {
        this.sweep(tileAround);
      }
    }
  }
}
