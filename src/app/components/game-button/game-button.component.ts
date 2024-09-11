import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-button',
  standalone: true,
  imports: [],
  templateUrl: './game-button.component.html',
  styleUrl: './game-button.component.css'
})
export class GameButtonComponent {
  @Input() stopped!: boolean;
  @Input() hasWon!: boolean;
  @Output() reset = new EventEmitter<void>();
  handleClick() {
    this.reset.emit();
  }
}
