import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { DeviceDetectorService } from '../../services/device-detector.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    MobileHeaderComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  @ViewChild('snav') snav!: MatSidenav;
  isMobile: boolean = false;
  private destroy$ = new Subject<void>();
  deviceDetector = inject(DeviceDetectorService);

  //       // this.snav.mode = 'over';
  //       // this.snav.close();

  //       // this.snav.mode = 'side';
  //       // this.snav.open();

  ngOnInit() {
    this.deviceDetector
      .isMobileDevice()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isMobile) => {
        this.isMobile = isMobile;
        if (this.isMobile) {
          this.loadMobileHeader();
        }
      });
  }

  private loadMobileHeader() {
    import('./mobile-header/mobile-header.component').then(
      ({ MobileHeaderComponent }) => {},
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
