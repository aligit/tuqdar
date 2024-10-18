import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink } from '@angular/router';

type Property = {
  image: string;
  title: string;
  description: string;
};

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, RouterLink],
  template: `
    <section class="property-listings">
      <h2>{{ title }}</h2>
      <div class="properties-grid">
        @for (property of properties; track property) {
          <div class="property-card">
            <img
              [src]="property.image"
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
  styles: `
    .property-listings {
      padding: 2rem;

      h2 {
        margin-bottom: 1.5rem;
        text-align: center;
        font-size: 2.5rem;
      }

      .properties-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;

        @media (max-width: 1200px) {
          grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 900px) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 600px) {
          grid-template-columns: 1fr;
        }
      }

      .property-card {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .property-info {
          padding: 1rem;
          text-align: center;
        }

        h3 {
          margin: 0 0 0.5rem;
          font-size: 1.2rem;
          font-weight: 500;
        }

        p {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.4;
        }
      }

      .more-properties-button {
        text-align: center;
        margin-top: 2rem;
      }
    }
  `,
})
export class FeaturedPropertiesComponent {
  @Input() title: string = 'ویلاهای پرطرفدار';
  @Input() properties: Property[] = [];
}
