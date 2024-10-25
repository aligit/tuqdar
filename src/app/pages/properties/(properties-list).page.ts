import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category, PropertyAttributes, PropertyResponse } from './models';

@Component({
  selector: 'app-properties-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink,
  ],
  template: `
    @if (categories) {
      <div>
        @for (category of categories; track category.name) {
          <section>
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
                        property.price | currency: 'IRR' : 'symbol' : '1.0-0'
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
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 24px;
    }

    section {
      margin-bottom: 32px;
    }

    h2 {
      margin-bottom: 16px;
      position: sticky;
      top: 0;
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

    @media (max-width: 1024px) {
      .property-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .property-grid {
        grid-template-columns: 1fr;
      }

      :host {
        padding: 16px;
      }
    }
  `,
})
export default class PropertiesListComponent {
  private http = inject(HttpClient);
  categories: Category[] | null = null;

  ngOnInit() {
    this.http.get<PropertyResponse>('/data/property-listings.json').subscribe({
      next: (response) => {
        this.categories = response.categories;
        console.log('Loaded categories:', this.categories); // Debug log
      },
      error: (error) => {
        console.error('Error loading properties:', error);
      },
    });
  }
}
