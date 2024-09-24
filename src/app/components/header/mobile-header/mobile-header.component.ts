import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss',
  animations: [
    trigger('sidenavAnimation', [
      state(
        'closed',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        }),
      ),
      state(
        'open',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        }),
      ),
      transition('closed <=> open', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class MobileHeaderComponent {
  isSidenavOpen = false;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
