import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  template: `
    <section class="banner">
      <img [src]="imageSrc" [alt]="imageAlt" class="banner-image" />
      <div class="banner-content">
        <h1>{{ title }}</h1>
      </div>
    </section>
  `,
  styles: `
.banner {
  position: relative;
  width: 100%;
  height: 400px;
  padding-top: 64px;
  margin-top: 0;

  .banner-image {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  .banner-content {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    padding: 1rem;
    border-radius: 8px;

    h1 {
      margin: 0;
      font-size: 2.5rem;
    }
  }

  @media (max-width: 600px) {
    height: 250px;

    .banner-content h1 {
      font-size: 2rem;
    }
  }
}
`
})
export class BannerComponent {
  @Input() imageSrc: string = '';
  @Input() imageAlt: string = '';
  @Input() title: string = '';

}
