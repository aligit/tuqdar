import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [MatIconModule],
  template: `<mat-icon svgIcon="{{ name }}"></mat-icon>`,
  styles: [':host { display: inline-block; }'],
})
export class IconComponent {
  @Input() name!: string;
}
