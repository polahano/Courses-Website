import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  isMobileDevice(): boolean {
    return window.innerWidth <= 599; // breakpoint for mobile

  }

}
