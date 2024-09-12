import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  standalone: true,
  template: ` <h1>Property: {{ slug | async }}</h1> `,
  imports: [AsyncPipe],
})
export default class PropertyComponent {
  route = inject(ActivatedRoute);
  slug = this.route.paramMap.pipe(map((params) => params.get('slug')));
}
