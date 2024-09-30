import { Component, inject, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header2',
  template: `
    <mat-toolbar class="header2-toolbar">
      @if (isHandset$ | async) {
        <button
          type="button"
          aria-label="Toggle sidenav"
          mat-icon-button
          (click)="toggleDrawer()"
        >
          <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
        </button>
      }

      <div class="logo-container">
        <a routerLink="/">
          <img
            src="/icons/swans.svg"
            alt="املاک دو قو Logo"
            class="logo"
            width="60"
            height="60"
          />
          <span class="app-name">املاک دو قو</span>
        </a>
      </div>
      <span class="spacer"></span>
      <div class="menu-container">
        <a mat-button routerLink="/property/toghdar" class="menu-item">املاک</a>
        <a mat-button routerLink="/about" class="menu-item">درباره ما</a>
        <a mat-button routerLink="/contact" class="menu-item">اطلاعات تماس</a>
      </div>
      <button mat-raised-button color="accent" class="cta-button">
        درخواست بازدید
      </button>
    </mat-toolbar>
    @if (isHandset$ | async) {
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav
          #drawer
          class="sidenav"
          dir="rtl"
          [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
          [mode]="(isHandset$ | async) ? 'over' : 'side'"
          [opened]="(isHandset$ | async) === false"
          [fixedInViewport]="true"
          [fixedTopGap]="56"
        >
          <!-- Adjust this value to match your toolbar height -->
          <mat-nav-list>
            <a mat-list-item routerLink="/property/toghdar">املاک</a>
            <a mat-list-item routerLink="/about">درباره ما</a>
            <a mat-list-item routerLink="/contact">اطلاعات تماس</a>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <!-- Add Content Here -->
        </mat-sidenav-content>
      </mat-sidenav-container>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .header2-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }

    .sidenav-container {
      flex: 1;
      //margin-top: 56px; /* Adjust this value to match your toolbar height */
    }

    .sidenav {
      width: 200px;
    }

    .logo-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: inherit;
        text-align: center; // Center the text
      }

      .logo {
        width: 60px;
        height: 60px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }

      .app-name {
        color: #fff; // White text color for menu
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.2;
      }
    }

    .spacer {
      flex: 1 1 auto;
    }

    @media (max-width: 600px) {
      .sidenav {
        width: 100%;
      }
    }
  `,
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class Header2Component {
  @ViewChild('drawer') drawer!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  toggleDrawer() {
    this.drawer?.toggle();
  }
}
