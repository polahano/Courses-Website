/*import { inject, PLATFORM_ID, Injectable } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

const ID = inject(PLATFORM_ID);

  isMobileDevice(): boolean {
    if(isPlatformBrowser(this.ID){
      return window.innerWidth <= 599;
    }
  }
}
*/
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  // Use a class property, not a bare const
  private readonly platformId = inject(PLATFORM_ID);

  /** True when running in the browser (not during prerender/SSR). */
  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /** Safe check that never touches window on the server. */
  isMobileDevice(): boolean {
    if (!this.isBrowser) return false; // must return on server
    return typeof window !== 'undefined' && window.innerWidth <= 599;
  }

  /** Optional helpers */
  get viewportWidth(): number | null {
    return this.isBrowser ? window.innerWidth : null;
  }
}
