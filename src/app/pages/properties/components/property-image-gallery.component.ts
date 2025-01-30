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
  template: `
    <div class="gallery-container">
      <div class="gallery-header">
        <span class="image-counter">{{ currentIndex + 1 }}/{{ data.images.length }}</span>
        <button mat-icon-button (click)="dialogRef.close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="gallery-content">
        <button
          mat-icon-button
          class="nav-button prev"
          (click)="previousImage()"
          [disabled]="currentIndex === 0"
        >
          <mat-icon>chevron_left</mat-icon>
        </button>

        <div class="image-container">
          <img
            [src]="data.images[currentIndex]"
            [alt]="data.title + ' image ' + (currentIndex + 1)"
          />
        </div>

        <button
          mat-icon-button
          class="nav-button next"
          (click)="nextImage()"
          [disabled]="currentIndex === data.images.length - 1"
        >
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .gallery-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.9);
      }

      .gallery-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        color: white;

        .image-counter {
          font: var(--mat-title-large-font);
        }
      }

      .gallery-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .image-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;

        img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
      }

      .nav-button {
        position: absolute;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        transform: scale(1.5);

        &.prev {
          left: 24px;
        }

        &.next {
          right: 24px;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    `,
  ],
})
export class PropertyImageGalleryComponent {
  currentIndex: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GalleryData,
    public dialogRef: MatDialogRef<PropertyImageGalleryComponent>,
  ) {
    this.currentIndex = data.startIndex;
  }

  previousImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextImage(): void {
    if (this.currentIndex < this.data.images.length - 1) {
      this.currentIndex++;
    }
  }
} 