import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PersianNumberPipe } from '../../shared/pipes/persian-number.pipe';
import { DataLoaderService } from '../../services/data-loader.service';

interface Property {
  propertyId: string;
  coverImage: string;
  title: string;
  description: string;
  builtArea?: string;
  plotArea?: string;
  numberOfRooms?: string | number;
  location?: string;
  price?: string;
  yearBuilt?: string | number;
  hasParking?: boolean;
};

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, RouterLink, PersianNumberPipe, MatIconModule],
  template: `
    <section class="property-listings">
      <h2>{{ title }}</h2>
      <div class="properties-grid">
        @for (property of properties; track property) {
          <div class="property-card" [routerLink]="['/properties', property.propertyId]" style="cursor: pointer;">
            <img
              [src]="property.coverImage"
              [alt]="property.title"
              class="property-image"
            />
            <div class="property-info">
              <h3>{{ property.title }}</h3>
              <p>{{ property.description }}</p>
            </div>
          </div>
        }
      </div>
      <div class="more-properties-button">
        <a mat-raised-button routerLink="/properties" color="accent"
          >مشاهده تمام ویلاها</a
        >
      </div>
    </section>
    <router-outlet></router-outlet>
  `,
  styleUrl: './featured-properties.component.scss',
})
export class FeaturedPropertiesComponent implements OnInit {
  @Input() title: string = 'ویلاهای پرطرفدار';
  properties: Property[] = [];
  private dataLoader = inject(DataLoaderService);

  ngOnInit() {
    this.dataLoader.getFeaturedProperties(4).subscribe({
      next: (properties) => {
        this.properties = properties;
      },
      error: (error) => {
        console.error('Error loading featured properties:', error);
      }
    });
  }
}
