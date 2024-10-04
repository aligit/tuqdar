import { Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconSvgService {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  constructor() {}
  registerSprite(): void {
    this.matIconRegistry.addSvgIconSet(
      this.domSanitizer.bypassSecurityTrustResourceUrl('/sprite.symbol.svg'),
    );
  }
}
