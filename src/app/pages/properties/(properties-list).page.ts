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
                    <mat-card appearance="outlined" class="property-card">
                      <img
                        mat-card-image
                        [src]="property.coverImage"
                        [alt]="property.title"
                        class="property-image"
                      />
                      <mat-card-content>
                        <h3>{{ property.title }}</h3>
                        <div class="property-features">
                          <div class="feature">
                            <mat-icon svgIcon="square_foot"></mat-icon>
                            <span>{{ property.plotArea }} متر مربع</span>
                          </div>
                          <div class="feature">
                            <mat-icon svgIcon="foundation"></mat-icon>
                            <span>{{ property.plotArea }} متر مربع</span>
                          </div>
                          <div class="feature">
                            <mat-icon svgIcon="bed"></mat-icon>
                            <span>{{ property.bedrooms }} خواب</span>
                          </div>
                          <div class="feature">
                            <mat-icon svgIcon="bathtub"></mat-icon>
                            <span>{{ property.bathrooms }} سرویس</span>
                          </div>
                          @if (property.landscape) {
                            <div class="feature">
                              <mat-icon svgIcon="landscape"></mat-icon>
                              <span>دارای باغچه</span>
                            </div>
                          }
                        </div>
                        <p class="price">
                          قیمت:
                          {{ property.price }}
                          تومان
                        </p>
                      </mat-card-content>
                      <mat-card-actions>
                        <a
                          mat-button
                          color="primary"
                          [routerLink]="['/properties', property.propertyId]"
                          >جزئیات بیشتر</a
                        >
                      </mat-card-actions>
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
      .property-features {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin: 16px 0;
      }

      .feature {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--mat-text-secondary-color);

        mat-icon {
          width: 20px;
          height: 20px;
        }
      }

      .price {
        margin-top: 16px;
        font-weight: 500;
      }
      .properties-container {
        height: calc(100vh - 64px);
        overflow: hidden;
      }

      .properties-content {
        padding: 24px 32px;
        overflow-y: auto;
      }

      .categories-nav {
        width: 280px;
        padding: 24px 0;
        border-radius: 0;

        mat-nav-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 24px;
        }
      }

      section {
        margin-bottom: 48px;
        scroll-margin-top: 80px;
      }

      .property-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
        margin: 24px 0;
      }

      .property-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        transition: transform 0.2s ease-in-out;

        &:hover {
          transform: translateY(-4px);
        }
      }

      .property-image {
        object-fit: cover;
        height: 200px;
        width: 100%;
        border-radius: 16px 16px 0 0;
      }

      mat-card-content {
        flex-grow: 1;
        padding: 16px;
      }

      mat-card-actions {
        padding: 8px 16px 16px;
      }

      mat-divider {
        margin: 48px 0;
      }

      @media (max-width: 1024px) {
        .property-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 600px) {
        .properties-content {
          padding: 16px;
        }

        .property-grid {
          grid-template-columns: 1fr;
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
      },
      error: (error) => {},
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
