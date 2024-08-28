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
  timeElapsed = 0;
  intervalID: any;
  private startEventSubscription!: Subscription;
  private stopEventSubscription!: Subscription;
  private resetEventSubscription!: Subscription;
  @Input() startEvent!: Observable<void>;
  @Input() stopEvent!: Observable<void>;
  @Input() resetEvent!: Observable<void>;
  
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

  ngOnInit() {
    this.startEventSubscription = this.startEvent.subscribe(()=>this.start());
    this.stopEventSubscription = this.stopEvent.subscribe(()=>this.stop());
    this.resetEventSubscription = this.resetEvent.subscribe(()=>this.reset());
  }

  ngOnDestroy() {
    this.startEventSubscription.unsubscribe();
    this.stopEventSubscription.unsubscribe();
    this.resetEventSubscription.unsubscribe();
  }
}
