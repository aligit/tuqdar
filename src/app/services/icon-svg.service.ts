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
  registerIcon(iconName: string, iconPath: string): void {
    this.matIconRegistry.addSvgIcon(
      iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath),
    );
  }

  registerIcons(icons: { name: string; path: string }[]): void {
    icons.forEach((icon) => this.registerIcon(icon.name, icon.path));
  }
}
