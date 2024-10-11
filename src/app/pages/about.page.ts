import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

providers: [
  provideAnimations(),
  provideHttpClient(),
]

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterOutlet, RouterLink],
  template: `
    <div class="about-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>About Us</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Welcome to our real estate platform. We are dedicated to providing the best service for our clients.</p>
          <p>Our mission is to help you find your dream property with ease and confidence.</p>
        </mat-card-content>
      </mat-card>
  <h1>Magic!</h1>
  <p><a routerLink="/magic/test">test</a>
        </p>
<p>
        <a routerLink="/magic/other">other</a></p>
  <router-outlet></router-outlet>
    </div>
  `,
  styles: `

    :host {
      display: block;
    }
    .about-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
  `,
})
export default class AboutPageComponent { }
