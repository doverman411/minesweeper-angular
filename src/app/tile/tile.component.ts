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
  @Input() isRunning = false;
  @Input() number = 0;
  @Output() gameOver = new EventEmitter<void>();
  hasFlag = false;
  isSwept = false; 

  handleClick() {
    if (this.hasFlag || !this.isRunning) return; 
    this.isSwept = true;
    if (this.hasMine && this.isRunning) {
      this.gameOver.emit();
    }
  }
  
  handleContextMenu(event: any) {
    event.preventDefault();
    if (!this.isRunning) return;
    this.hasFlag = !this.hasFlag;
  }
  
}
