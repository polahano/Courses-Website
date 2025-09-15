import { Component, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { DeviceService } from '../../../core/services/device/device.service';

@Component({
  selector: 'app-home-hero',
  imports: [CarouselModule],
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.scss'
})
export class HomeHeroComponent {

  readonly deviceService = inject(DeviceService)

  bannerCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    freeDrag: true,
    dots: true,
    navSpeed: 700,
    autoWidth: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1200: {
        items: 1
      }
    },
  }

  banners = [
    {
      "id": 0,
      "brief": "Learn UI-UX Design skills with weekend UX . The latest online learning system and material that help your knowledge growing.",
      "image": 'images/hero-lg.png',
      "order": 1,
      "title": "\u003Ch1\u003EBetter \u003Cspan\u003EInsights\u003C/span\u003E For Business \u003Cspan\u003EGrowth\u003C/span\u003E\u003C/h1\u003E",
      "category": "Outsource",
      "colorCode": "00B8FF"
    },
    {
      "id": 1,
      "brief": "Whether you’re a startup or an enterprise, our creative team brings your vision to life with innovative designs and robust development.",
      "image": 'images/hero-lg-2.png',
      "order": 3,
      "title": "\u003Ch1\u003ETransforming \u003Cspan\u003EIdeas\u003C/span\u003E Into Digital \u003Cspan\u003EReality\u003C/span\u003E\u003C/h1\u003E",
      "category": "Marking",
      "colorCode": "A6E51C"
    },
    {
      "id": 2,
      "brief": "Beyond development, we’re here to ensure your success with continuous support, optimization, and a commitment to your growth.",
      "image": 'images/hero-lg-3.png',
      "order": 2,
      "title": "\u003Ch1\u003EDedicated \u003Cspan\u003ESupport\u003C/span\u003E & Continuous \u003Cspan\u003EGrowth\u003C/span\u003E\u003C/h1\u003E",
      "category": "Trendy Inside-Out",
      "colorCode": "FD6F00"
    }
  ]

}
