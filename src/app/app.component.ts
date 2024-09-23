import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        margin: 0;
        padding: 0;
      }

      .content {
        flex: 1;
        padding: 2rem;
        max-width: 1280px;
        margin: 0 auto;
        width: 100%;
      }
    `,
  ],
})
export class AppComponent {}
