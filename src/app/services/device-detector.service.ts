import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetectorService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  isMobileDevice(): Observable<boolean> {
    return this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .pipe(map((result) => result.matches));
  }
}
