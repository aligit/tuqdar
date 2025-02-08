import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterLink
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
                        <span class="protected-number" aria-label="شماره تلفن">
                          <span data-n="۰">۰</span>&#8206;<span data-n="۹">۹</span>&#8206;<span data-n="۱">۱</span>&#8206;<span data-n="۲">۲</span>&#8206;<span data-n="۰">۰</span>&#8206;<span data-n="۶">۶</span>&#8206;<span data-n="۸">۸</span>&#8206;<span data-n="۴">۴</span>&#8206;<span data-n="۵">۵</span>&#8206;<span data-n="۳">۳</span>&#8206;<span data-n="۹">۹</span>
                        </span>
                      </p>
                      <p>
                        <mat-icon svgIcon="mail">رایانامه</mat-icon>
<span class="protected-email" aria-label="رایانامه">
  <span data-e="2">2</span><span data-e="g">g</span><span data-e="h">h</span><span data-e="o">o</span><span data-e="u">u</span><span data-e="@">&#64;</span><span data-e="p">p</span><span data-e="r">r</span><span data-e="o">o</span><span data-e="t">t</span><span data-e="o">o</span><span data-e="n">n</span><span data-e=".">.</span><span data-e="m">m</span><span data-e="e">e</span>
</span>
                      </p>
                    </div>

          <div class="social-links">
            <a href="https://t.me/donsato" target="_blank" rel="noopener noreferrer" class="social-link telegram">
              <mat-icon svgIcon="telegram"></mat-icon>
              <span>تلگرام</span>
            </a>

            <a href="https://wa.me/+989127363243" target="_blank" rel="noopener noreferrer" class="social-link whatsapp">
              <mat-icon svgIcon="whatsapp"></mat-icon>
              <span>واتس‌اپ</span>
            </a>

            <!-- Uncomment and update the Instagram link when you have your Instagram page
            <a href="https://instagram.com/RealEstateAnalog" target="_blank" rel="noopener noreferrer" class="social-link instagram">
              <mat-icon svgIcon="instagram"></mat-icon>
              <span>اینستاگرام</span>
            </a>
            -->
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

    .protected-number {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      font-family: 'Vazirmatn', monospace;
      direction: ltr;
      unicode-bidi: bidi-override;
    }

    .protected-number span,
    .protected-email span {
      display: inline-block;
      position: relative;
      font-family: inherit;
    }

    .protected-email {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      direction: ltr;
      unicode-bidi: bidi-override;
    }

    @media (pointer: coarse) {
      .protected-number {
        pointer-events: none;
      }
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
      transition: all 0.2s ease;
      cursor: pointer;
      min-width: 140px;
      justify-content: center;
    position: relative;
    z-index: 1;
    -webkit-tap-highlight-color: transparent;
        }

        .social-link span,
        .social-link mat-icon {
    pointer-events: none;
    }

    .social-link mat-icon {
      margin-left: 0.5rem;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .social-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .social-link:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
export default class AboutPageComponent implements OnInit {
  ngOnInit(): void { }
}
