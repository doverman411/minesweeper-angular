import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent implements OnInit, OnDestroy {
  @Input() hasMine!: boolean;
  @Input() started!: boolean;
  @Input() stopped!: boolean;
  @Input() number!: number;
  @Input() resetEventIn!: Observable<void>;
  @Output() startEventOut = new EventEmitter<void>();
  @Output() stopEventOut = new EventEmitter<void>();
  @Output() flagEvent = new EventEmitter<boolean>();
  private resetEventSubscription!: Subscription;
  hasFlag = false;
  isSwept = false; 

  ngOnInit(): void {
    this.resetEventSubscription = this.resetEventIn.subscribe(()=>this.reset());
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  handleClick() {
    if (this.hasFlag || this.stopped) return; 
    this.isSwept = true;
    if (!this.started) {
      console.log('emitting gameStart');
      this.startEventOut.emit();
    }
    if (this.hasMine && !this.stopped) {
      this.stopEventOut.emit();
    }
  }
  
  handleContextMenu(event: any) {
    event.preventDefault();
    if (this.isSwept || this.stopped) return;
    this.hasFlag = !this.hasFlag;
    this.flagEvent.emit(this.hasFlag);
  }

  reset() {
    this.hasFlag = false;
    this.isSwept = false;
  }
  
}
