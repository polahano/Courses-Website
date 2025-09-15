import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgxNumberTickerComponent } from "@omnedia/ngx-number-ticker";
import { DeviceService } from '../../../core/services/device/device.service';

@Component({
  selector: 'app-home-numbers',
  imports: [NgxNumberTickerComponent],
  templateUrl: './home-numbers.component.html',
  styleUrl: './home-numbers.component.scss'
})
export class HomeNumbersComponent implements OnInit {


  platformID = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformID);
  private readonly deviceService = inject(DeviceService)

  ngOnInit(): void {
    if (this.isBrowser) {
      this.deviceService.isMobileDevice();
      window.addEventListener('resize', () => this.deviceService.isMobileDevice());
    }
  }





}
