import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { PropertyImageGalleryComponent } from './components/property-image-gallery.component';
import { HttpClient } from '@angular/common/http';
import { PropertyResponse, Property } from './models';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  template: `
    @if (property$ | async; as property) {
      <div class="property-details">
        <div class="image-gallery">
          <mat-grid-list cols="2" rowHeight="400px" gutterSize="16">
            <mat-grid-tile colspan="1" rowspan="1">
              <img
                [src]="property.coverImage"
                [alt]="property.title"
                class="main-image"
                (click)="openGallery(property, 0)"
              />
            </mat-grid-tile>
            <mat-grid-tile colspan="1" rowspan="1">
              <div class="thumbnail-grid">
                @for (image of property.images.slice(0, 4); track image; let i = $index) {
                  <div 
                    class="thumbnail" 
                    [class.see-all]="i === 3"
                    (click)="openGallery(property, i + 1)"
                  >
                    <img [src]="image" [alt]="property.title + ' image ' + i" />
                    @if (i === 3) {
                      <div class="see-all-overlay">
                        <span>See all photos</span>
                      </div>
                    }
                  </div>
                }
              </div>
            </mat-grid-tile>
          </mat-grid-list>
        </div>

        <div class="property-content">
          <mat-card appearance="outlined">
            <mat-card-content>
              <h1>{{ property.title }}</h1>
              <p class="location">
                <mat-icon>location_on</mat-icon>
                {{ property.location }}
              </p>
              <mat-divider></mat-divider>

              <div class="property-features">
                <div class="feature">
                  <mat-icon svgIcon="square_foot"></mat-icon>
                  <span>{{ property.plotArea }} متر مربع زمین</span>
                </div>
                <div class="feature">
                  <mat-icon svgIcon="foundation"></mat-icon>
                  <span>{{ property.builtArea }} متر مربع بنا</span>
                </div>
                @if (property.bedrooms) {
                  <div class="feature">
                    <mat-icon svgIcon="bed"></mat-icon>
                    <span>{{ property.bedrooms }} خواب</span>
                  </div>
                }
                @if (property.bathrooms) {
                  <div class="feature">
                    <mat-icon svgIcon="bathtub"></mat-icon>
                    <span>{{ property.bathrooms }} سرویس</span>
                  </div>
                }
              </div>

              <mat-divider></mat-divider>

              <div class="price-section">
                <h2>قیمت</h2>
                <p class="price">{{ property.price }} تومان</p>
              </div>

              @if (property.agent) {
                <mat-divider></mat-divider>
                <div class="agent-section">
                  <h2>مشاور املاک</h2>
                  <div class="agent-info">
                    <img
                      [src]="property.agent.avatar"
                      [alt]="property.agent.name"
                      class="agent-avatar"
                    />
                    <span>{{ property.agent.name }}</span>
                  </div>
                </div>
              }
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    } @else {
      <div class="loading">
        <mat-spinner></mat-spinner>
      </div>
    }
  `,
  styles: [
    `
      .property-details {
        max-width: 1400px;
        margin: 0 auto;
        padding: 24px;
      }

      .image-gallery {
        margin-bottom: 24px;
      }

      .main-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }

      .thumbnail-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 8px;
        width: 100%;
        height: 100%;
      }

      .thumbnail {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          transition: transform 0.3s ease;
        }

        &:hover img {
          transform: scale(1.05);
        }

        &.see-all {
          .see-all-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            font-weight: 500;
            border-radius: 8px;
          }
        }
      }

      .property-content {
        max-width: 800px;
        margin: 0 auto;

        h1 {
          font: var(--mat-headline-large-font);
          margin-bottom: 16px;
        }

        .location {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--mat-text-secondary-color);
          margin-bottom: 24px;
        }

        .property-features {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          padding: 24px 0;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 8px;

          mat-icon {
            color: var(--mat-text-secondary-color);
          }
        }

        .price-section {
          padding: 24px 0;

          h2 {
            font: var(--mat-title-large-font);
            margin-bottom: 8px;
          }

          .price {
            font: var(--mat-headline-medium-font);
            color: var(--mat-primary-color);
          }
        }

        .agent-section {
          padding: 24px 0;

          h2 {
            font: var(--mat-title-large-font);
            margin-bottom: 16px;
          }

          .agent-info {
            display: flex;
            align-items: center;
            gap: 16px;

            .agent-avatar {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              object-fit: cover;
            }
          }
        }
      }

      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 400px;
      }
    `,
  ],
})
export default class PropertyDetailsComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  property$ = this.route.params.pipe(
    switchMap((params) =>
      this.http.get<PropertyResponse>('/data/property-listings.json').pipe(
        map((response) => {
          const property = response.categories
            .flatMap((category) => category.properties)
            .find((p) => p.propertyId === params['propertyId']);
          return property;
        }),
      ),
    ),
  );

  openGallery(property: Property, startIndex: number): void {
    this.dialog.open(PropertyImageGalleryComponent, {
      data: {
        images: [property.coverImage, ...property.images],
        startIndex,
        title: property.title,
      },
      panelClass: 'gallery-dialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
    });
  }
}
