import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <!-- New Banner Section -->
    <section class="banner">
      <img
        src="/images/index-banner.jpeg"
        alt="Toghdar Banner"
        class="banner-image"
      />
      <div class="banner-content">
        <h1>Find Your Dream Property</h1>
      </div>
    </section>

    <!-- Property Listings Section -->
    <section class="property-listings">
      <h2>Featured Properties</h2>
      <div class="properties-grid">
        @for (property of properties; track property; let i = $index) {
          <div class="property-card">
            <img
              [src]="property.image"
              alt="{{ property.title }}"
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
    .banner {
      position: relative;
      width: 100%;
      height: 400px;
      padding-top: 64px; /* Adjust this value to match your header height */
      margin-top: 0; /* Remove the margin */

      .banner-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .banner-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        text-align: center;

        h1 {
          font-size: 3rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      }
    }

    /* Property Listings Styles */
    .property-listings {
      padding: 2rem;

      h2 {
        text-align: center;
        margin-bottom: 1.5rem;
        color: #333;
      }

      .properties-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        justify-items: center;
      }

      .property-card {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
          color: #333;
        }

        p {
          padding: 0 1rem 1rem 1rem;
          font-size: 1rem;
          color: #666;
        }
      }
    }

    /* Responsive Styles */
    @media (max-width: 1200px) {
      .property-listings .properties-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 992px) {
      .property-listings .properties-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .banner {
        height: 250px;

        .banner-content h1 {
          font-size: 2rem;
        }
      }

      .property-listings .properties-grid {
        grid-template-columns: 1fr;
      }

      .banner-content {
        padding: 0 1rem;
      }
    }
  `,
})
export default class HomeComponent {
  //Make sure to replace images with better alternatives
  properties = [
    {
      image: 'public/images/1.jpeg',
      title: 'Luxury Villa',
      description: 'A beautiful villa with sea view.',
    },
    {
      image: 'public/images/2.jpeg',
      title: 'Modern Apartment',
      description: 'A spacious apartment in the city center.',
    },
    {
      image: 'public/images/3.jpg',
      title: 'Country House',
      description: 'A cozy house in the countryside.',
    },
    {
      image: 'public/images/4.jpg',
      title: 'Penthouse Suite',
      description: 'An exclusive penthouse with all amenities.',
    },
  ];
}
