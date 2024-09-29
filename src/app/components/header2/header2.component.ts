import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-header2',
  template: `
    <mat-toolbar class="header2-toolbar">
      @if (isHandset$ | async) {
        <button
          type="button"
          aria-label="Toggle sidenav"
          mat-icon-button
          (click)="drawer.toggle()"
        >
          <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
        </button>
      }
      <img src="/icons/swans-mobile.svg" alt="املاک دو قو Logo" class="logo" />
      <span class="logo-text">املاک دو قو</span>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      @if (isHandset$ | async) {
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
            <a mat-list-item routerLink="/">Link 1</a>
            <a mat-list-item routerLink="/">Link 2</a>
            <a mat-list-item routerLink="/">Link 3</a>
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
    }

    .sidenav-container {
      flex: 1;
      //margin-top: 56px; /* Adjust this value to match your toolbar height */
    }

    .sidenav {
      width: 200px;
    }

    .logo {
      margin-left: 8px;
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
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );
}
