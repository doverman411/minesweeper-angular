import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { FlagCounterComponent } from '../flag-counter/flag-counter.component';
import { GameButtonComponent } from '../game-button/game-button.component';
import { TimerComponent } from '../timer/timer.component';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-top-hud',
  standalone: true,
  imports: [FlagCounterComponent, GameButtonComponent, TimerComponent],
  templateUrl: './top-hud.component.html',
  styleUrl: './top-hud.component.css'
})
export class TopHudComponent implements OnInit, OnDestroy {
  private startEventSubscription!: Subscription;
  private stopEventSubscription!: Subscription;
  private resetEventSubscription!: Subscription;
  startSubject: Subject<void> = new Subject<void>();
  stopSubject: Subject<void> = new Subject<void>();
  resetSubject: Subject<void> = new Subject<void>();
  @Input() startEvent!: Observable<void>;
  @Input() stopEvent!: Observable<void>;
  @Input() resetEvent!: Observable<void>;

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

  start() {
    console.log('nexting startSubject2');
    this.startSubject.next();
  }

  stop() {
    this.stopSubject.next();
  }

  reset() {
    this.resetSubject.next();
  }
}
