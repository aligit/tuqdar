import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MarkdownComponent, injectContent } from '@analogjs/content';
import { PropertyAttributes } from './models';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, MarkdownComponent],
  template: `
  <ng-container *ngIf="property$ | async as property">

    <h1>{{ property.attributes.title }}</h1>
    <analog-markdown [content]="property.content"></analog-markdown>
    </ng-container>

  `,
})
export default class PropertyComponent {
  readonly property$ = injectContent<PropertyAttributes>({
    param: 'propertyId',
    subdirectory: 'properties',
  });
}
