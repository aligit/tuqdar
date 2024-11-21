import { Component, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category, PropertyResponse } from './models';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-properties-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  template: `
    <mat-sidenav-container class="properties-container">
      <mat-sidenav
        mode="side"
        [opened]="!(isHandset$ | async)"
        class="categories-nav"
      >
        <mat-nav-list>
          @for (category of categories; track category.id) {
            <a
              mat-list-item
              (click)="scrollToCategory(category)"
              [class.active]="activeCategory === category.id"
            >
              {{ category.name }}
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        @if (categories) {
          <div class="properties-content">
            @for (category of categories; track category.id) {
              <section [id]="category.id">
                <h2>{{ category.name }}</h2>
                <div class="property-grid">
                  @for (
                    property of category.properties;
                    track property.propertyId
                  ) {
                    <mat-card class="property-card">
                      <div class="image-container mat-elevation-z0">
                        <img
                          mat-card-image
                          [src]="property.coverImage"
                          [alt]="property.title"
                        />
                      </div>

                      <mat-card-content>
                        <div class="location">
                          <mat-icon>location_on</mat-icon>
                          <span class="address">{{ property.location }}</span>
                        </div>

                        <h2 class="title">{{ property.title }}</h2>

                        <div class="details">
                          <span class="detail-item">
                            <mat-icon>bed</mat-icon>
                            {{ property.bedrooms }} خواب
                          </span>
                          <span class="detail-item">
                            <mat-icon>bathtub</mat-icon>
                            {{ property.bathrooms }} سرویس
                          </span>
                          <span class="detail-item">
                            <mat-icon>square_foot</mat-icon>
                            {{ property.builtArea }} متر
                          </span>
                          <span class="detail-item" *ngIf="property.landscape">
                            <mat-icon>yard</mat-icon>
                            {{ property.landscape }} متر
                          </span>
                        </div>

                        <div class="footer">
                          <span class="price"
                            >{{ property.price | number }} تومان</span
                          >
                          <div class="agent" *ngIf="property.agent">
                            <img
                              [src]="property.agent.avatar"
                              [alt]="property.agent.name"
                              class="agent-avatar"
                            />
                            <span class="agent-name">{{
                              property.agent.name
                            }}</span>
                          </div>
                        </div>
                      </mat-card-content>
                    </mat-card>
                  }
                </div>
              </section>
              @if (!$last) {
                <mat-divider></mat-divider>
              }
            }
          </div>
        }
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .property-card {
        border-radius: 16px;
        overflow: hidden;
        margin: 16px;
        transition: all 200ms ease;
        cursor: pointer;
        background: var(--mat-surface-container-low);
        border: 1px solid var(--mat-surface-container-highest);

        &:hover {
          transform: translateY(-4px);
          box-shadow: var(--mat-elevation-2);
        }
      }

      .image-container {
        position: relative;
        padding-top: 66.67%; // 3:2 aspect ratio
        overflow: hidden;
        background: var(--mat-surface-container);

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 200ms ease;
        }

        &:hover img {
          transform: scale(1.05);
        }
      }

      mat-card-content {
        padding: 16px;
      }

      .location {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
        color: var(--mat-primary);

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }

        .address {
          font-size: 14px;
          font-weight: 400;
          color: var(--mat-on-surface-variant);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .title {
        margin: 12px 0;
        font-size: 20px;
        line-height: 1.4;
        font-weight: 500;
        color: var(--mat-on-surface);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .details {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin: 16px 0;

        .detail-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--mat-on-surface-variant);
          font-size: 14px;

          mat-icon {
            font-size: 20px;
            width: 20px;
            height: 20px;
            color: var(--mat-secondary);
          }
        }
      }

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--mat-outline-variant);

        .price {
          font-size: 18px;
          font-weight: 600;
          color: var(--mat-primary);
          direction: rtl;

          &::after {
            content: ' تومان';
            font-size: 14px;
            font-weight: 400;
            color: var(--mat-on-surface-variant);
          }
        }

        .agent {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px;
          border-radius: 24px;
          transition: background-color 200ms ease;

          &:hover {
            background-color: var(--mat-surface-container-highest);
          }

          .agent-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--mat-surface-container-highest);
          }

          .agent-name {
            font-size: 14px;
            font-weight: 500;
            color: var(--mat-on-surface-variant);
            margin-right: 4px;
          }
        }
      }

      // Responsive adjustments
      @media (max-width: 599px) {
        .property-card {
          margin: 8px;
        }

        .title {
          font-size: 18px;
        }

        .details {
          gap: 12px;

          .detail-item {
            font-size: 13px;

            mat-icon {
              font-size: 18px;
              width: 18px;
              height: 18px;
            }
          }
        }

        .footer {
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;

          .price {
            font-size: 16px;
          }

          .agent {
            width: 100%;
            justify-content: flex-end;
          }
        }
      }

      // High-contrast mode adjustments
      @media (forced-colors: active) {
        .property-card {
          border: 2px solid CanvasText;
        }

        .footer {
          border-top: 1px solid CanvasText;
        }

        .agent-avatar {
          border: 1px solid CanvasText;
        }
      }
    `,
  ],
})
export default class PropertiesListComponent {
  private http = inject(HttpClient);
  private viewportScroller = inject(ViewportScroller);
  private breakpointObserver = inject(BreakpointObserver);
  categories: Category[] = [];
  activeCategory: string = '';
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  ngOnInit() {
    this.http.get<PropertyResponse>('/data/property-listings.json').subscribe({
      next: (response) => {
        this.categories = response.categories;
        console.log('Loaded categories:', this.categories);
      },
      error: (error) => {
        console.error('Error loading properties:', error);
      },
    });
  }
  ngAfterViewInit() {
    // Set up intersection observer to detect which category is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeCategory = entry.target.id;
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px', // Adjust these values to control when the active state changes
      },
    );

    // Observe all category sections
    this.categories.forEach((category) => {
      const element = document.getElementById(category.id);
      if (element) observer.observe(element);
    });
  }

  scrollToCategory(category: Category): void {
    const element = document.getElementById(category.id);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}
