import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
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
      transition(
        'closed <=> open',
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class MobileHeaderComponent implements OnInit {
  isSidenavOpen = false;
  isRtl = false;

  menuItems = [
    { label: 'خانه', route: '/home' },
    { label: 'درباره ما', route: '/about' },
    { label: 'خدمات', route: '/services' },
    { label: 'تماس با ما', route: '/contact' },
  ];

  ngOnInit() {
    this.isRtl = document.dir === 'rtl';
  }

  get closedTransform(): string {
    return this.isRtl ? 'translateX(100%)' : 'translateX(-100%)';
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    document.body.style.overflow = this.isSidenavOpen ? 'hidden' : '';
  }
}
