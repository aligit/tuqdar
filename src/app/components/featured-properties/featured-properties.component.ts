import { Component, Input } from '@angular/core';

type Property = {
  image: string;
  title: string;
  description: string;
};

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [],
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
            <h3>{{ property.title }}</h3>
            <p>{{ property.description }}</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
   .property-listings {
      padding: 2rem;

      h2 {
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .properties-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        justify-items: center;
      }

      .property-card {
        border-radius: 8px;
        overflow: hidden;
        width: 100%;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-5px);
        }

        .property-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        h3 {
          margin: 1rem 0 0.5rem 0;
          font-size: 1.25rem;
        }

        p {
          padding: 0 1rem 1rem 1rem;
          font-size: 1rem;
        }
      }
    }

    @media (max-width: 1200px) {
      .properties-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 992px) {
      .properties-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .properties-grid {
        grid-template-columns: 1fr;
      }
    }
`
})
export class FeaturedPropertiesComponent {
  @Input() title: string = 'Featured Properties';
  @Input() properties: Property[] = [];
}
