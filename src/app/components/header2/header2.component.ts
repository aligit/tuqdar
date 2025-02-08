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
import { IconComponent } from '../icon/icon.component';
import { RouterLink } from '@angular/router';

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
          <app-icon name="menu_open"></app-icon>
        </button>
      }

      <div class="logo-container">
        <a routerLink="/">
          <img
            src="/icons/swans.svg"
            alt="املاک دو قو Logo"
            class="logo"
            width="48"
            height="48"
          />
          <span class="logo-text">املاک دو قو</span>
        </a>
      </div>
      <span class="spacer"></span>
      @if (!(isHandset$ | async)) {
        <div class="menu-container">
          <a mat-button routerLink="/properties" class="menu-item"
            >املاک</a
          >
<!--          <a mat-button routerLink="/about" class="menu-item">درباره ما</a>    -->
         <a mat-button routerLink="/about" class="menu-item">تماس</a>
        </div>
        <button mat-raised-button color="accent" class="cta-button" (click)="revealPhone()">
          {{ isPhoneRevealed ? '۰۹۱۲۰۶۸۴۵۳۹' : 'نمایش شماره تماس' }}
        </button>
      }
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      @if (isHandset$ | async) {
        <mat-sidenav
          #drawer
          class="sidenav"
          dir="rtl"
          [attr.role]="'dialog'"
          [mode]="'over'"
          [fixedInViewport]="true"
          [fixedTopGap]="56"
        >
          <mat-nav-list>
            <a mat-list-item routerLink="/property/toghdar">املاک</a>
            <a mat-list-item routerLink="/about">درباره ما</a>
            <a mat-list-item routerLink="/contact">اطلاعات تماس</a>
            <a mat-list-item class="cta-button-mobile">درخواست بازدید</a>
          </mat-nav-list>
        </mat-sidenav>
      }
      <mat-sidenav-content>
        <!-- Add Content Here -->
      </mat-sidenav-content>
    </mat-sidenav-container>
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
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 16px;
    }

    .logo-container {
      display: flex;
      align-items: center;

      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
      }

      .logo {
        margin-right: 8px;
      }

      .logo-text {
        font-size: 1.2rem;
        font-weight: 500;
        white-space: nowrap;
      }
    }

    .spacer {
      flex: 1 1 auto;
    }

    .menu-container {
      display: flex;
      align-items: center;

      .menu-item {
        margin: 0 8px;
      }
    }

    .cta-button {
      margin-left: 16px;
    }

    .sidenav-container {
      position: absolute;
      top: 64px;
      bottom: 0;
      left: 0;
      right: 0;
      background: transparent;
    }

    .sidenav {
      width: 250px;
      z-index: 3;
    }

    @media (max-width: 600px) {
      .header2-toolbar {
        height: 56px;
      }

      .sidenav-container {
        top: 56px;
      }

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
    IconComponent,
    RouterLink,
  ],
})
export class Header2Component {
  @ViewChild('drawer') drawer!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);
  isPhoneRevealed = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  toggleDrawer() {
    this.drawer?.toggle();
  }

  revealPhone() {
    this.isPhoneRevealed = true;
  }
}
