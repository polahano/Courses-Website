import { Component, inject, OnInit } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { DeviceService } from '../../../core/services/device/device.service';
import { GalleryService } from '../../../core/services/gallery/gallery.service';
import { ISlider } from '../../../shared/interfaces/islider';

@Component({
  selector: 'app-home-gallery',
  imports: [CarouselModule],
  templateUrl: './home-gallery.component.html',
  styleUrl: './home-gallery.component.scss'
})
export class HomeGalleryComponent implements OnInit {

  isMobile: boolean = false;
  galleryImages: string[] = [];
  sliderImages: ISlider[] = [];
  readonly deviceService = inject(DeviceService)
  private readonly galleryService = inject(GalleryService)


  ngOnInit(): void {
    this.galleryService.getSliderImages().subscribe({
      next: (res) => {
        this.sliderImages = res.Slider;
        this.galleryImages = res.Slider.map((p: { image: any; }) => p.image);
      }, error: (err) => {
        console.log(err);
      }
    })
  }


  galleryCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    freeDrag: true,
    dots: false,
    navSpeed: 700,
    center: true,
    autoWidth: true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 3
      },
      600: {
        items: 3
      },
      1200: {
        items: 4
      }
    },
    nav: true
  }



}
