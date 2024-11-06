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
  ],
  template: `
    <mat-sidenav-container class="properties-container">
      <mat-sidenav mode="side" opened class="categories-nav">
        <mat-nav-list>
          @for (category of categories; track category.name) {
            <a
              mat-list-item
              (click)="scrollToCategory(category)"
              [class.active]="activeCategory === category.name"
            >
              {{ category.name }}
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        @if (categories) {
          <div class="properties-content">
            @for (category of categories; track category.name) {
              <section [id]="category.name">
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
                        <p>متراژ: {{ property.size }} متر مربع</p>
                        <p>
                          قیمت:
                          {{
                            property.price
                              | currency: 'IRR' : 'symbol' : '1.0-0'
                          }}
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
      .properties-content {
        padding: 24px;
      }

      section {
        margin-bottom: 32px;
        scroll-margin-top: 80px;
      }

      h2 {
        margin-bottom: 16px;
        position: sticky;
        top: 64px;
        background: var(--mat-toolbar-container-background-color);
        padding: 16px 0;
        z-index: 1;
      }

      .property-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-bottom: 32px;
      }

      .property-card {
        max-width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .property-image {
        object-fit: cover;
        height: 168px;
        width: 100%;
      }

      mat-card-content {
        flex-grow: 1;
      }

      mat-card-content h3 {
        margin-bottom: 8px;
      }

      mat-divider {
        margin: 32px 0;
      }
      .properties-container {
        height: calc(100vh - 64px);
      }

      .categories-nav {
        width: 250px;
        padding: 16px;
      }

      mat-nav-list {
        margin-top: 16px;
      }

      @media (max-width: 1024px) {
        .property-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 600px) {
        .property-grid {
          grid-template-columns: 1fr;
        }

        .properties-content {
          padding: 16px;
        }
      }
    `,
  ],
})
export default class PropertiesListComponent {
  private http = inject(HttpClient);
  private viewportScroller = inject(ViewportScroller);
  categories: Category[] = [];
  activeCategory: string = '';

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
      const element = document.getElementById(category.name);
      if (element) observer.observe(element);
    });
  }

  scrollToCategory(category: Category): void {
    const element = document.getElementById(category.name);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}
