import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h2>Properties(properties.page.ts)</h2>

    <router-outlet></router-outlet>
  `,
})
export default class PropertiesComponent {}
