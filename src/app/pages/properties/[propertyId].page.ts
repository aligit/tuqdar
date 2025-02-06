import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PropertyResponse } from './models';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GalleryModule, Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatChipsModule,
    MatTooltipModule,
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
              (click)="openInFullScreen(0)"
              />
            </mat-grid-tile>
            <mat-grid-tile colspan="1" rowspan="1">
              <div class="thumbnail-grid">
                @for (image of property.images.slice(0, 4); track image; let i = $index) {
                  <div
                    class="thumbnail"
                    [class.see-all]="i === 3"
                  >
                    <img (click)="openInFullScreen(i + 1)" [src]="image" [alt]="property.title + ' image ' + i" />
                    @if (i === 3) {
                      <div class="see-all-overlay" (click)="openInFullScreen(3)">
                        <span>سایر تصاویر</span>
                      </div>
                    }
                  </div>
                }
              </div>
            </mat-grid-tile>
          </mat-grid-list>
        </div>

        <div class="property-content">
          <mat-card appearance="outlined" class="main-info-card">
            <mat-card-content>
                              <div class="title-container">
                                <mat-icon svgIcon="subject"/>
                                <h1>{{ property.title }}</h1>
                              </div>
              <p class="location">
                <mat-icon svgIcon="location_on"/>
                {{ property.location }}
              </p>

              <mat-divider></mat-divider>

              <!-- Property Highlights -->
              @if (property.propertyHighlightFlags?.length) {
                <div class="highlights-section">
                  <h2>ویژگی‌های برجسته</h2>
                  <div class="highlights-chips">
                    @for (flag of property.propertyHighlightFlags; track flag) {
                      <mat-chip-option selected>{{ flag }}</mat-chip-option>
                    }
                  </div>
                </div>
                <mat-divider></mat-divider>
              }

              <!-- Property Features -->
              <div class="property-features">
                <div class="feature">
                  <mat-icon svgIcon="square_foot"></mat-icon>
                  <span>{{ property.plotArea }} متر مربع زمین</span>
                </div>
                <div class="feature">
                  <mat-icon svgIcon="foundation"></mat-icon>
                  <span>{{ property.builtArea }} متر مربع بنا</span>
                </div>
                @if (property.propertyInvestmentScore) {
                  <div class="feature score-feature"
                       [matTooltip]="'امتیاز سرمایه‌گذاری'">
                    <mat-icon>trending_up</mat-icon>
                    <span>{{ property.propertyInvestmentScore }} / 100</span>
                  </div>
                }
                @if (property.neighborhoodFitScore) {
                  <div class="feature score-feature"
                       [matTooltip]="'امتیاز محله'">
                    <mat-icon>location_city</mat-icon>
                    <span>{{ property.neighborhoodFitScore }} / 5</span>
                  </div>
                }
              </div>

              <mat-divider></mat-divider>

              <!-- Market Trends -->
              @if (property.marketTrendPrediction) {
                <div class="market-trends">
                  <h2>تحلیل بازار</h2>
                  <div class="trend-info">
                    <div class="trend-item">
                      <mat-icon [class]="property.marketTrendPrediction.toLowerCase()">
                        {{ property.marketTrendPrediction === 'Rising' ? 'trending_up' : 'trending_flat' }}
                      </mat-icon>
                      <span>{{ property.marketTrendPrediction }}</span>
                    </div>
                    @if (property.rp) {
                      <div class="trend-item">
                        <mat-icon>analytics</mat-icon>
                        <span>نسبت قیمت به اجاره: {{ property.rp }}</span>
                      </div>
                    }
                  </div>
                </div>
                <mat-divider></mat-divider>
              }

              <!-- Price Section -->
              <div class="price-section">
                  <div class="section-header">
                    <mat-icon svgIcon="payments"/>
                    <p class="price">{{ property.price  }} تومان</p>
                  </div>
                @if (property.priceTrend?.length) {
                  <div class="price-trend">
                    <span class="trend-label">روند قیمت:</span>
                    <div class="trend-values">
                      @for (price of property.priceTrend; track price) {
                        <span>{{ price | number }}</span>
                        @if (!$last) {
                          <mat-icon>arrow_forward</mat-icon>
                        }
                      }
                    </div>
                  </div>
                }
              </div>

              <!-- Description -->
              <mat-divider></mat-divider>
              <div class="description-section">
                <div class="section-header">
                  <mat-icon svgIcon="description"/>
                </div>
                <p>{{ property.description }}</p>
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

        .title-container {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;

          mat-icon {
            color: var(--mat-text-secondary-color);
          }

          h1 {
            font: var(--mat-headline-large-font);
            margin: 0;
          }
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

          .section-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;

            mat-icon {
              color: var(--mat-text-secondary-color);
            }

            .price {
              font: var(--mat-headline-medium-font);
              color: var(--mat-primary-color);
              margin: 0;
            }
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

      .highlights-section {
        padding: 24px 0;

        h2 {
          font: var(--mat-title-large-font);
          margin-bottom: 16px;
        }

        .highlights-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
      }

      .market-trends {
        padding: 24px 0;

        h2 {
          font: var(--mat-title-large-font);
          margin-bottom: 16px;
        }

        .trend-info {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .trend-item {
          display: flex;
          align-items: center;
          gap: 8px;

          mat-icon {
            &.rising {
              color: var(--mat-success-color);
            }
          }
        }
      }

      .price-trend {
        margin-top: 16px;

        .trend-label {
          display: block;
          margin-bottom: 8px;
          color: var(--mat-text-secondary-color);
        }

          .trend-values {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;

            span {
              font: var(--mat-body-large-font);
            }

            mat-icon {
              color: var(--mat-text-secondary-color);
              font-size: 18px;
              width: 18px;
              height: 18px;
            }
          }
      }

      .description-section {
        padding: 24px 0;

        .section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;

          mat-icon {
            color: var(--mat-text-secondary-color);
          }

          h2 {
            font: var(--mat-title-large-font);
            margin: 0;
          }
        }

        p {
          line-height: 1.6;
          color: var(--mat-text-secondary-color);
        }
      }

      .score-feature {
        mat-icon {
          color: var(--mat-primary-color);
        }
      }
    `,
  ],
})
export default class PropertyDetailsComponent {
  propertyImages: string[] = [];
  readonly galleryId = 'propertyGallery';
  items: GalleryItem[] = [];

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

  private galleryRef: any;

  ngOnInit() {
    this.property$.subscribe(property => {
      if (property) {
        // Include cover image in the gallery items
        this.propertyImages = [property.coverImage, ...property.images];
        this.items = this.propertyImages.map(image => new ImageItem({ src: image, thumb: image }));

        // Initialize gallery with config
        this.galleryRef = this.gallery.ref(this.galleryId);
        this.galleryRef.setConfig({
          thumbPosition: 'bottom',
          imageSize: 'contain',
          counter: true,
          loadingStrategy: 'preload'
        });
        this.galleryRef.load(this.items);
      }
    });
  }

  openInFullScreen(index: number) {
    if (this.items && this.items.length > 0) {
      // For "see all" button
      if (index === 3 && this.items.length > 4) {
        this.lightbox.open(3, this.galleryId, {
          panelClass: 'fullscreen'
        });
      } else {
        // For individual image clicks
        this.lightbox.open(index, this.galleryId, {
          panelClass: 'fullscreen'
        });
      }
    }
  }
}
