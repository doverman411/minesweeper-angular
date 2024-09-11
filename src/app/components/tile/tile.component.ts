import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent {
  @Input() hasMine!: boolean;
  @Input() started!: boolean;
  @Input() stopped!: boolean;
  @Input() hasWon!: boolean;
  @Input() number!: number;
  @Input() hasFlag!: boolean;
  @Input() isSwept!: boolean;
  @Input() id!: any;
  @Input() resetEventIn!: Observable<void>;
  @Output() startEventOut = new EventEmitter<any>();
  @Output() stopEventOut = new EventEmitter<boolean>();
  @Output() flagEvent = new EventEmitter<any>();
  @Output() tileClick = new EventEmitter<any>();


/*
#FBAE77
#E86746
#96DEFE
#FFFEFF
*/


  get numberColor() {
    switch(this.number) {
      case 1:
        return '#FBAE77';
      case 2:
        return '#96DEFE';
      case 3:
        return '#E86746';
      case 4:
        return '#242424';
      case 5:
        return '#E86746';
      case 6:
        return '#96DEFE';
      case 7:
        return '#FBAE77';
      case 8:
        return '#242424'
      default:
        return 'white';
    }
  }

  handleClick() {
    this.tileClick.emit(this.id);
  }
  
  handleContextMenu(event: any) {
    event.preventDefault();
    if (this.isSwept || this.stopped) return;
    this.hasFlag = !this.hasFlag;
    this.flagEvent.emit({
      hasFlag: this.hasFlag,
      tileID: this.id
    });
  }
  
}
