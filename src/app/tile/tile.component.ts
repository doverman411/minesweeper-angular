import { Component, Input } from '@angular/core';
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
  @Input() hasFlag = false; // input not needed
  @Input() isSwept = false; // input not needed
  
}
