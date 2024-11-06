import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header2Component } from './components/header2/header2.component';
import { IconSvgService } from './services/icon-svg.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header2Component],
  template: `
    <app-header2></app-header2>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
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
      padding-top: 64px;
      padding-left: 2rem;
      padding-right: 2rem;
      max-width: 1280px;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    }
    @media (max-width: 600px) {
      .content {
        padding-top: 56px;
      }
    }
  `],
})
export class AppComponent {
  private iconSvgService = inject(IconSvgService);

  constructor() {
    this.iconSvgService.registerSprite();
  }
}
