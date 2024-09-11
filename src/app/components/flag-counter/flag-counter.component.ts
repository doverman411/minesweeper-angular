import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-flag-counter',
  standalone: true,
  imports: [],
  templateUrl: './flag-counter.component.html',
  styleUrl: './flag-counter.component.css'
})
export class FlagCounterComponent {
  @Input() count!: number;
}
