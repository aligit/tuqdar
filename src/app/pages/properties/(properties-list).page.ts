import { RouterOutlet, RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { PropertyAttributes } from './models';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
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
  styles: `
    a {
      position: relative;
      z-index: 1;
    }
  `,
})
export default class PropertiesListComponent {
  readonly properties = injectContentFiles<PropertyAttributes>((contentFile) =>
    contentFile.filename.includes('/properties/'),
  );
}
