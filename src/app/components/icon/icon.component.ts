import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  template: ` <mat-icon [svgIcon]="name"></mat-icon> `,
  styles: [':host { display: inline-block; }'],
})
export class IconComponent {
  @Input() name!: string;
}
