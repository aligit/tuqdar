import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface GalleryData {
  images: string[];
  startIndex: number;
  title: string;
}

@Component({
  selector: 'app-property-image-gallery',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: ``,
  styles: [
    ``,
  ],
})
export class PropertyImageGalleryComponent {

}
