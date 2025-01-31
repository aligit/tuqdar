import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GalleryModule, Gallery, GalleryRef } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

interface GalleryData {
  images: string[];
  startIndex: number;
  title: string;
}

@Component({
  selector: 'app-property-image-gallery',
  standalone: true,
  imports: [GalleryModule, LightboxModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <gallery [id]="galleryId"></gallery>
    </mat-dialog-content>
  `,
})
export class PropertyImageGalleryComponent {
  galleryId = 'property-gallery';
  galleryRef: GalleryRef;

  constructor(
    public dialogRef: MatDialogRef<PropertyImageGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GalleryData,
    private gallery: Gallery
  ) {
    this.galleryRef = this.gallery.ref(this.galleryId);
  }

  ngOnInit() {
    // Create gallery items from the images
    const items = this.data.images.map(src => ({
      src: src,
      thumb: src
    }));

    this.galleryRef.load(items);
    if (this.data.startIndex) {
      this.galleryRef.set(this.data.startIndex);
    }
  }
}
