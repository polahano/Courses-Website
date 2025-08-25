import { Injectable } from '@angular/core';
import { isMobileDevice } from '../../../shared/utils/device.util';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  public readonly isMobile: boolean = isMobileDevice();

}
