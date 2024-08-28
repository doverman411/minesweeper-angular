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
  @Output() flagEvent = new EventEmitter<boolean>();
  @Output() sweepEvent = new EventEmitter<any>();

  handleClick() {
    this.sweepEvent.emit(this.id);
  }
  
  handleContextMenu(event: any) {
    event.preventDefault();
    if (this.isSwept || this.stopped) return;
    this.hasFlag = !this.hasFlag;
    this.flagEvent.emit(this.hasFlag);
  }
  
}
