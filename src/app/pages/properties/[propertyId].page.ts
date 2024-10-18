import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MarkdownComponent, injectContent } from '@analogjs/content';
import { PropertyAttributes } from './models';

@Component({
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent],
  template: `
    @if (property$ | async; as property) {
      <h1>{{ property.attributes.title }}</h1>
      <analog-markdown [content]="property.content"></analog-markdown>
    } @else {
      <p>Loading property details...</p>
    }
  `,
})
export default class PropertyComponent {
  readonly property$ = injectContent<PropertyAttributes>({
    param: 'propertyId',
    subdirectory: 'properties',
  });
}
