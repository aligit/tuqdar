import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

providers: [
  provideAnimations(),
  provideHttpClient(),
]

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule,
  ],
  template: `
    <div class="contact-container">
      <mat-card class="contact-card">
        <mat-card-header>
          <mat-card-title>کانال‌های تماس با ما</mat-card-title>
        </mat-card-header>

        <mat-card-content>
                    <div class="contact-info">
                      <p>
                        <mat-icon svgIcon="call">شماره تلفن</mat-icon>
                        ۰۲۱-۱۲۳۴۵۶۷۸
                      </p>
                      <p>
                        <mat-icon svgIcon="mail">رایانامه</mat-icon>
2ghou&#64;proton.me
                      </p>
                    </div>

          <div class="social-links">
            <a href="https://t.me/yourhandle" target="_blank" class="social-link telegram">
              <mat-icon svgIcon="telegram"></mat-icon>
              <span>تلگرام</span>
            </a>

            <a href="https://wa.me/+989123456789" target="_blank" class="social-link whatsapp">
              <mat-icon svgIcon="whatsapp"></mat-icon>
              <span>واتس‌اپ</span>
            </a>

            <a href="https://instagram.com/yourhandle" target="_blank" class="social-link instagram">
              <mat-icon svgIcon="instagram"></mat-icon>
              <span>اینستاگرام</span>
            </a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Vazirmatn', sans-serif;
    }

    .contact-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .contact-card {
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    mat-card-title {
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    mat-card-subtitle {
      font-size: 1rem;
      color: #666;
    }

    .contact-info {
      margin: 2rem 0;
    }

    .contact-info p {
      display: flex;
      align-items: center;
      margin: 1rem 0;
      font-size: 1.1rem;
      color: #444;
    }

    .contact-info mat-icon {
      margin-left: 1rem;
      color: #666;
    }

    .social-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      color: white;
      font-weight: 500;
      transition: transform 0.2s;
    }

    .social-link mat-icon {
      margin-left: 0.5rem;
      width: 24px;
      height: 24px;
    }

    .social-link:hover {
      transform: translateY(-2px);
    }

    .telegram {
      background: #0088cc;
    }

    .whatsapp {
      background: #25D366;
    }

    .instagram {
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    }

    @media (max-width: 600px) {
      .social-links {
        flex-direction: column;
      }

      .social-link {
        width: 100%;
        justify-content: center;
      }
    }
  `],
})
export default class AboutPageComponent { }
