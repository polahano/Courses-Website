import { inject, PLATFORM_ID, Injectable } from '@angular/core';
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
