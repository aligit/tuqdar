import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

providers: [
  provideAnimations(),
  provideHttpClient(),
]

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule],
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
    </div>
  `,
  styles: `
    .about-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
  `,
})
export default class AboutPageComponent { }
