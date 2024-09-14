import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {
  private width = new BehaviorSubject<number>(24); 
  private height = new BehaviorSubject<number>(20);
  private numMines = new BehaviorSubject<number>(99);
  private numFlags = new BehaviorSubject<number>(0);
  private started = new BehaviorSubject<boolean>(false);
  private stopped = new BehaviorSubject<boolean>(false);
  private hasWon = new BehaviorSubject<boolean>(false);
  private remainingFlags = new BehaviorSubject<number>(this.numMines.value);
  private tiles = new BehaviorSubject<any>([]);
  private tilesCleared = new BehaviorSubject<number>(0);

  width$ = this.width.asObservable();
  height$ = this.width.asObservable();
  numMines$ = this.numMines.asObservable();
  numFlags$ = this.numFlags.asObservable(); 
  started$ = this.started.asObservable();
  stopped$ = this.stopped.asObservable();
  hasWon$ = this.hasWon.asObservable();
  remainingFlags$ = this.remainingFlags.asObservable();
  tiles$ = this.tiles.asObservable();
  tilesCleared$ = this.tilesCleared.asObservable();

  setWidth(width: number) {
    this.width.next(width); 
  }
  setHeight(height: number) {
    this.height.next(height);
  }
  setNumMines(numMines: number) {
    this.numMines.next(numMines);
    this.remainingFlags.next(numMines-this.numFlags.value);
  }
  setNumFlags(numFlags: number) {
    this.numFlags.next(numFlags);
    this.remainingFlags.next(this.numMines.value-numFlags);
  }
  setStarted(started: boolean) {
    this.started.next(started);
  }
  setStopped(stopped: boolean) {
    this.stopped.next(stopped);
  }
  setHasWon(hasWon: boolean) {
    this.hasWon.next(hasWon);
  }
  setTiles(tiles: any) {
    this.tiles.next(tiles);
  }
  setTilesCleared(tilesCleared: number) {
    this.tilesCleared.next(tilesCleared); 
  }

  startAt(tileID: any) {
    this.setStarted(true);
    this.placeMines(tileID);
  }

  stop(hasWon: boolean) {
    this.setStopped(true);
    this.setHasWon(hasWon);
  }

  reset() {
    this.setNumFlags(0);
    this.setStarted(false);
    this.setStopped(false);
    this.setHasWon(false);
    this.setTilesCleared(0);
    this.initializeTiles();
  }

  validCoordinate(row: number, col: number) {
    return 0 <= row && row < this.height.value && 0 <= col && col < this.width.value;
  }

  tileAt(row: number, col: number) {
    return this.tiles.value[row].row[col].tile;
  }

  tileWithID(id: any) {
    return this.tileAt(id.row, id.col);
  }

  tileIDsAround(coordinate: any) {
    let ret: any = []
    let row = coordinate.row;
    let col = coordinate.col;
    for(let r=row-1;r<=row+1;++r) {
      for(let c=col-1;c<=col+1;++c) {
        if (this.validCoordinate(r,c) && !(r==row && c==col)) {
          ret.push({row: r, col: c});
        }
      }
    }
    return ret;
  }

  tilesAround(coordinate: any) {
    return this.tileIDsAround(coordinate).map((id: any)=>this.tileWithID(id));
  }

  initializeTiles() {
    let tiles: any = [];
    for (let r=0; r<this.height.value;++r) {
      tiles.push({
        id: r,
        row: [] 
      });
      for (let c=0; c<this.width.value;++c) {
        tiles[r].row.push({
          id: {row: r, col: c},
          tile: {
            hasMine: new BehaviorSubject<boolean>(false),
            number: new BehaviorSubject<number>(0),
            hasFlag: new BehaviorSubject<boolean>(false),
            isSwept: new BehaviorSubject<boolean>(false),
          }
        });
      }
    }
    this.setTiles(tiles);
  }

  placeMines(tileID: any) {
    // generating list of all coordinates 
    const row = tileID.row; 
    const col = tileID.col;
    let pool = [];
    for (let r=0; r<this.height.value;++r) {
      for (let c=0; c<this.width.value; ++c) {
        if (!(r == row && c == col)) {
          pool.push({row: r, col: c});
        }
      }
    }
    // placing mines
    for (let i=0; i<this.numMines.value;++i) {
      let randomIndex = Math.floor(Math.random() * pool.length);
      let coordinate = pool[randomIndex];
      this.tileWithID(coordinate).hasMine.next(true);
      pool.splice(randomIndex,1);
      for(const tile of this.tilesAround(coordinate)) {
        tile.number.next(tile.number.value+1);
      }
    }
  }

  clickTile(tileID: any) {
    const tile: any = this.tileWithID(tileID);
    if (tile.hasFlag.value || this.stopped.value) {
      return;
    }
    if (tile.isSwept.value) {
      this.chord(tileID);
    } else {
      this.sweep(tileID);
    }
  }

  chord(tileID: any) {
    const tile: any = this.tileWithID(tileID);
    const tileIDsAround = this.tileIDsAround(tileID);
    if (tileIDsAround.filter((tid: any)=>this.tileWithID(tid).hasFlag.value).length === tile.number.value) {
      for(const tileID of tileIDsAround.filter((tid: any)=>!this.tileWithID(tid).hasFlag.value)) {
        this.sweep(tileID);
      }
    }
  }

  sweep(tileID: any) {
    const tile: any = this.tileWithID(tileID);
    if (tile.isSwept.value || tile.hasFlag.value || this.stopped.value ) {
      return;
    }
    tile.isSwept.next(true);
    this.setTilesCleared(this.tilesCleared.value + 1);
    if (!this.started.value) {
      this.startAt(tileID);
    }
    if (tile.hasMine.value && !this.stopped.value) {
      this.stop(false);
      return;
    }
    if (this.tilesCleared.value === this.width.value * this.height.value - this.numMines.value) {
      this.stop(true);
      return;
    }
    if (tile.number.value === 0) {
      for (const tileIDAround of this.tileIDsAround(tileID)) {
        this.sweep(tileIDAround);
      }
    }
  }

  flagTile(id: any) {
    if (this.stopped.value) {
      return;
    }
    const tile: any = this.tileWithID(id);
    if (tile.isSwept.value) {
      return;
    }
    const hasFlagBefore = tile.hasFlag.value;
    tile.hasFlag.next(!hasFlagBefore);
    this.setNumFlags(this.numFlags.value + (hasFlagBefore ? -1 : 1));
  }

  constructor() {}
}
