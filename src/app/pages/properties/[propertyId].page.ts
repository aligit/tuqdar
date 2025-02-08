import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
import { PersianNumberPipe } from '../../shared/pipes/persian-number.pipe';

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
    PersianNumberPipe
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
                <div class="feature">
                  <mat-icon svgIcon="meeting_room"/>
                  <span>{{ property.numberOfRooms }} اتاق</span>
                </div>
                <div class="feature">
                  <mat-icon svgIcon="calendar_today"/>
                  <span>ساخت {{ property.yearBuilt }}</span>
                </div>
                @if (property.totalFloors && property.totalFloors > 0 ) {
                  <div class="feature">
                    <mat-icon svgIcon="layers"/>
                    <span> {{ property.totalFloors | persianNumber }} طبقه </span>
                  </div>
                }
              </div>

              <!-- Additional Features -->
              <div class="additional-features">
                <h2>امکانات و مشخصات</h2>
                <div class="features-grid">
                  <div class="feature-item">
                    <mat-icon svgIcon="directions_car" [class.has-feature]="property.hasParking"/>
                    <span>پارکینگ <mat-icon [svgIcon]="property.hasParking ? 'check_circle' : 'cancel'"></mat-icon></span>
                  </div>
                  <div class="feature-item">
                    <mat-icon svgIcon="warehouse"  [class.has-feature]="property.hasCellar"/>
                    <span>انباری <mat-icon [svgIcon]="property.hasCellar ? 'check_circle' : 'cancel'"></mat-icon></span>
                  </div>
                  <div class="feature-item">
                    <mat-icon svgIcon="balcony"  [class.has-feature]="property.hasBalcony"/>
                    <span>بالکن <mat-icon [svgIcon]="property.hasBalcony ? 'check_circle' : 'cancel'"></mat-icon></span>
                  </div>
                  <div class="feature-item">
                    <mat-icon svgIcon="grid_view"/>
                    <span>کف‌پوش: {{ property.floorMaterial }}</span>
                  </div>
                  <div class="feature-item">
                    <mat-icon svgIcon="wc"/>
                    <span>سرویس بهداشتی {{ property.toiletType }}</span>
                  </div>
                  <div class="feature-item">
                    <mat-icon svgIcon="ac_unit"/>
                    <span>سیستم سرمایش
                      @if (property.coolingSystem === 'ندارد' || !property.coolingSystem) {
                        <mat-icon svgIcon="cancel"></mat-icon>
                      } @else {
                        {{ property.coolingSystem }}
                      }
                    </span>
                  </div>
                  <div class="feature-item">
                    <mat-icon svgIcon="local_fire_department"/>
                    <span>سیستم گرمایش
                      @if (property.heatingSystem === 'ندارد' || !property.heatingSystem){
                        <mat-icon svgIcon="cancel"/>
                    } @else {
                      {{property.heatingSystem}}
                      }
                      </span>
                  </div>
                  <div class="feature-item">
                    <mat-icon svgIcon="water_drop"/>
                    <span>آبگرمکن
                      @if(property.waterHeaterSystem === 'ندارد' || !property.waterHeaterSystem){
                        <mat-icon svgIcon="cancel" />
                    }@else{
                        {{property.waterHeaterSystem}}
                      }
                   </span>
                  </div>
                  <div class="feature-item">
                    <mat-icon svgIcon="description"/>
                    <span>سند: {{ property.propertyTitle }}</span>
                  </div>
                </div>
              </div>
              <!-- Property Features -->
              <div class="property-features">
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
                          <mat-icon svgIcon="arrow_forward"/>
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

                          @if (property.videoUrl) {
                            <mat-divider></mat-divider>
                            <div class="video-section">
                              <div class="section-header">
                                <mat-icon svgIcon="videocam"/>
                                <h2>ویدیوی ملک</h2>
                              </div>
                              <div class="video-container">
                                <iframe
                                  [src]="getVideoUrl(property.videoUrl)"
                                  frameborder="0"
                                  allowfullscreen
                                ></iframe>
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
  styleUrl: './propertyId.scss',
})
export default class PropertyDetailsComponent {

  propertyImages: string[] = [];
  readonly galleryId = 'propertyGallery';
  items: GalleryItem[] = [];

  public gallery = inject(Gallery);
  private sanitizer = inject(DomSanitizer)
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
  getVideoUrl(url: string) {
    // Convert regular Aparat URL to embed URL
    const videoId = url.split('/').pop();
    const embedUrl = `https://www.aparat.com/video/video/embed/videohash/${videoId}/vt/frame`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
