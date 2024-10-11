import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { PropertyAttributes } from './models';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  template: `
   <h2>Properties List</h2>
    <ul>
      @for (property of properties; track property.attributes.propertyId) {
        <li>
          <a [routerLink]="['/properties', property.attributes.propertyId]">
            {{ property.attributes.title }}
          </a>
        </li>
      }
    </ul>
  `,
  imports: [RouterLink],
})
export default class PropertiesListComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Property Listings');
    this.meta.updateTag({ name: 'description', content: 'Browse our property listings' });
  }
  readonly properties = injectContentFiles<PropertyAttributes>((contentFile) =>
    contentFile.filename.includes('/properties/')
  );
}