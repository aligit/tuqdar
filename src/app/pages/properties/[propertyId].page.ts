import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PropertyResponse, Property } from './models';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GalleryModule, Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { provideAnimations } from '@angular/platform-browser/animations';

providers: [
  provideAnimations(),
]

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
    LightboxModule,
    GalleryModule,
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
              />
            </mat-grid-tile>
            <mat-grid-tile colspan="1" rowspan="1">
              <div class="thumbnail-grid">
                @for (image of property.images.slice(0, 4); track image; let i = $index) {
                  <div
                    class="thumbnail"
                    [class.see-all]="i === 3"
                  >
                    <img (click)="openInFullScreen(4)" [src]="image" [alt]="property.title + ' image ' + i" />
                    @if (i === 3) {
                      <div [lightbox]="i" [gallery]="galleryId" class="see-all-overlay">
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
        padding: 16px;
      }

      .image-gallery {
        margin-bottom: 24px;
      }

      .main-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        cursor: pointer;
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
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        &.see-all {
          .see-all-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0.7)
            );
            backdrop-filter: blur(2px);
            z-index: 1;
            transition: all 0.3s ease;

            span {
              color: white;
              font: var(--mat-title-small-font);
              background: rgba(255, 255, 255, 0.15);
              padding: 12px 24px;
              border-radius: 32px;
              transform: translateY(0);
              transition: all 0.3s ease;
              border: 1px solid rgba(255, 255, 255, 0.2);
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            &:hover {
              background: linear-gradient(
                rgba(0, 0, 0, 0.4),
                rgba(0, 0, 0, 0.8)
              );

              span {
                transform: translateY(-2px);
                background: rgba(255, 255, 255, 0.2);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
              }

              & + img {
                transform: scale(1.05);
              }
            }
          }

          img {
            filter: brightness(0.9);
            transition: all 0.3s ease;
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
  propertyImages: string[] = [];
  galleryId = 'propertyLightbox';
  items!: GalleryItem[];

  public gallery = inject(Gallery);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private lightbox = inject(Lightbox);

  property$ = this.route.params.pipe(
    switchMap((params) =>
      this.http.get<PropertyResponse>('/data/property-listings.json').pipe(
        map((response) => {
          const propertyId = params['propertyId'];
          return response.categories.find(category =>
            category.properties.some(property => property.propertyId === propertyId)
          )?.properties.find(property => property.propertyId === propertyId);
        })
      )
    )
  );

  ngOnInit() {
    this.property$.subscribe(property => {
      if (property) {
        this.propertyImages = property.images;
        this.items = this.propertyImages.map(image => new ImageItem({ src: image, thumb: image }));
        const galleryRef = this.gallery.ref(this.galleryId);
        galleryRef.load(this.items);
      }
    });
  }

  openInFullScreen(index: number) {
    this.lightbox.open(index, this.galleryId, {
      panelClass: 'fullscreen'
    });
  }
}
