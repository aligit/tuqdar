import { Component } from '@angular/core';
import { BannerComponent } from '../components/banner/banner.component';
import { FeaturedPropertiesComponent } from '../components/featured-properties/featured-properties.component';

@Component({
  selector: 'app-home',
  imports: [BannerComponent, FeaturedPropertiesComponent],
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
    }`,
})
export default class HomeComponent {
  //Make sure to replace images with better alternatives
  properties = [
    {
      image: '/images/3.jpg',
      title: 'ویلا دوبلکس مدرن(  شمالی )',
      description: '۵۰۰ متر تا دریا، سکوت و آرامش',
    },
    {
      image: '/images/1.jpeg',
      title: 'ویلا دوبلکس مدرن( جنوبی )',
      description: '۳ اتاق خواب، استخر و پارکینگ',
    },
    {
      image: '/images/pamchal/3.JPEG',
      title: 'فلت مدرن  ۱۶۰ متری',
      description: 'دنج و با صفا و آرام ده دقیقه تا ساحل، فرنیش کامل',
    },
    {
      image: '/images/shirinbol/4.jpg',
      title: 'ویلا باغ لوکس',
      description: 'شیک، دنج، سرسبز، خلوت و آرام',
    },
  ];
}
