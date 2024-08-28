import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent {
  @Input() hasMine = false;
  @Input() started = false;
  @Input() ended = false;
  @Input() number = 0;
  @Output() gameStart = new EventEmitter<void>();
  @Output() gameOver = new EventEmitter<void>();
  hasFlag = false;
  isSwept = false; 

  handleClick() {
    if (this.hasFlag || this.ended) return; 
    this.isSwept = true;
    if (!this.started) {
      console.log('emitting gameStart');
      this.gameStart.emit();
    }
    if (this.hasMine && !this.ended) {
      this.gameOver.emit();
    }
  }
  
  handleContextMenu(event: any) {
    event.preventDefault();
    if (this.isSwept || this.ended) return;
    this.hasFlag = !this.hasFlag;
  }
  
}
