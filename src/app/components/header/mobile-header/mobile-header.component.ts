import { Component, ElementRef, Renderer2, inject } from '@angular/core';
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
          transform: '{{closedTransform}}',
        }),
        { params: { closedTransform: 'translateX(100%)' } },
      ),
      state(
        'open',
        style({
          transform: 'translateX(0)',
        }),
      ),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class MobileHeaderComponent {
  isSidenavOpen = false;
  isRtl = false;
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  ngOnInit() {
    this.isRtl = document.dir === 'rtl';
  }

  get closedTransform(): string {
    return this.isRtl ? 'translateX(100%)' : 'translateX(-100%)';
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    if (this.isSidenavOpen) {
      this.renderer.addClass(document.body, 'sidenav-open');
    } else {
      this.renderer.removeClass(document.body, 'sidenav-open');
    }
  }
}
