import { Component } from '@angular/core';
import { BannerComponent } from '../components/banner/banner.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FeaturedPropertiesComponent } from '../components/featured-properties/featured-properties.component';

@Component({
  selector: 'app-home',
  imports: [
    BannerComponent,
    FeaturedPropertiesComponent,
    RouterOutlet,
    RouterLink,
  ],
  standalone: true,
  template: `
    <app-banner
      imageSrc="/images/index-banner.jpeg"
      imageAlt="Toghdar Banner"
    ></app-banner>

    <app-featured-properties
      [title]="'املاک دینجی'"
      [properties]="properties"
    ></app-featured-properties>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class HomeComponent {
  //Make sure to replace images with better alternatives
  properties = [
    {
      image: 'https://s100.divarcdn.com/static/photo/neda/post/d_D8umgFAaf-oTTLBY_IJg/43719b03-b03d-4291-b1b9-730855eb98ee.jpg',
      title: 'تکواحدی بازسازی شده تخلیه',
      description: '۵۰۰ متر تا دریا، سکوت و آرامش',
    },
    {
      image: 'https://s100.divarcdn.com/static/photo/neda/post/mZv2sRx2LdlaOQKKe0fePQ/7b7072e4-4fca-460a-a614-27f891d40107.jpg',
      title: '۱۰۳مترسند تک برگ شمالی روبه نما فول',
      description: '۳ اتاق خواب، استخر و پارکینگ',
    },
    {
      image: 'https://s100.divarcdn.com/static/photo/neda/post/26l6ijMSew41AQjuwP1acw/95553005-8a31-49a2-8b26-4c9dbfe683cf.jpg',
      title: 'فلت مدرن  ۱۶۰ متری',
      description: 'دنج و با صفا و آرام ده دقیقه تا ساحل، فرنیش کامل',
    },
    {
      image: 'https://s100.divarcdn.com/static/photo/neda/post/MM7MEJh-jPR_Mazcb2KhaA/db2a6890-12d4-4f53-bd88-dbeda66327af.jpg',
      title: 'ویلا باغ لوکس',
      description: 'شیک، دنج، سرسبز، خلوت و آرام',
    },
  ];
}
