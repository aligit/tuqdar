import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { Header2Component } from './components/header2/header2.component';
import { IconSvgService } from './services/icon-svg.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header2Component,
    MatSidenavModule,
    MatListModule,
    CommonModule,
  ],
  template: `
    <app-header2></app-header2>
    <mat-sidenav-container class="app-container">
      @if (showSidenav$ | async) {
        <mat-sidenav mode="side" opened class="categories-nav">
          <mat-nav-list>
            @for (category of categories; track category.id) {
              <a mat-list-item (click)="scrollToCategory(category)">
                {{ category.displayName }}
              </a>
            }
          </mat-nav-list>
        </mat-sidenav>
      }
      <mat-sidenav-content>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        margin: 0;
        padding: 0;
      }
      .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
      }

      .content {
        flex: 1;
        padding-top: 64px;
        padding-left: 2rem;
        padding-right: 2rem;
        max-width: 1280px;
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;
      }

      .categories-nav {
        width: 250px;
        padding: 16px;
      }

      mat-sidenav-container {
        flex: 1;
      }

      mat-nav-list {
        margin-top: 64px; // To account for the header
      }

      .mat-list-item {
        cursor: pointer;
      }
      @media (max-width: 600px) {
        .content {
          padding-top: 56px;
        }
      }
    `,
  ],
})
export class AppComponent {
  ngOnInit() {
    console.log('Categories:', this.categories);

    this.showSidenav$.subscribe((isShown) => {
      console.log('Sidenav visible:', isShown);
    });
  }
  private iconSvgService = inject(IconSvgService);
  private router = inject(Router);
  categories: { id: string; displayName: string }[] = [
    { id: 'villa-north', displayName: 'ویلاهای شمال' },
    { id: 'lavasan-and-north-land', displayName: 'زمین‌های شمال و لواسان' },
    { id: 'tehran-appartment', displayName: 'آپارتمان‌های تهران' },
  ];

  scrollToCategory(category: { id: string; displayName: string }): void {
    const element = document.getElementById(category.id);
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  showSidenav$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => {
      console.log('Current URL:', event.url);
      const shouldShow = event.url.includes('/properties');
      console.log('Should show sidenav:', shouldShow);
      return shouldShow;
    }),
  );

  constructor() {
    this.iconSvgService.registerSprite();
  }
}
