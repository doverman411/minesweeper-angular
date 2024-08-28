import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy{
  @Input() startEventIn!: Observable<void>;
  @Input() stopEventIn!: Observable<void>;
  @Input() resetEventIn!: Observable<void>;
  private startEventSubscription!: Subscription;
  private stopEventSubscription!: Subscription;
  private resetEventSubscription!: Subscription;
  timeElapsed = 0;
  intervalID: any;

  ngOnInit() {
    this.startEventSubscription = this.startEventIn.subscribe(()=>this.start());
    this.stopEventSubscription = this.stopEventIn.subscribe(()=>this.stop());
    this.resetEventSubscription = this.resetEventIn.subscribe(()=>this.reset());
  }

  ngOnDestroy() {
    this.startEventSubscription.unsubscribe();
    this.stopEventSubscription.unsubscribe();
    this.resetEventSubscription.unsubscribe();
  }
  
  start() {
    this.intervalID = setInterval(()=>++this.timeElapsed,1000);
  }

  stop() {
    clearInterval(this.intervalID);
  }

  reset() {
    this.timeElapsed = 0;
    this.stop();
  }
}
