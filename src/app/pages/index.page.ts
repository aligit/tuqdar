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
      title="ویلاهای ساحلی فرح آباد"
    ></app-banner>

    <app-featured-properties
      [title]="'ویلاهای ویژه'"
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
  properties = [
    {
      id: 'v-golha-jonubi',
      image: '/images/golha-jonubi/landscape.jpg',
      title: 'ویلا دوبلکس مدرن( جنوبی )',
      description: '۳ اتاق خواب، استخر و پارکینگ',
    },
    {
      id: 'v-golha-shomali',
      image: '/images/golha-shomali/landscape.JPEG',
      title: 'ویلا دوبلکس مدرن(  شمالی )',
      description: '۵۰۰ متر تا دریا، سکوت و آرامش',
    },
    {
      id: 'v-toranj-2bar',
      image: '/images/toranj-2bar/landscape.JPEG',
      title: 'فلت مدرن  ۱۶۰ متری',
      description: 'دنج و با صفا و آرام ده دقیقه تا ساحل، فرنیش کامل',
    },
    {
      id: 'v-shirinbol',
      image: '/images/shirinbol/4.jpg',
      title: 'ویلا باغ لوکس',
      description: 'شیک، دنج، سرسبز، خلوت و آرام',
    },
  ];
}
