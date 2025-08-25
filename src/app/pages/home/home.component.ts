import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ISlider } from '../../shared/interfaces/islider';
import { GalleryService } from '../../core/services/gallery/gallery.service';
import { CourseCardComponent } from "../../shared/components/course-card/course-card.component";
import { ICourse } from '../../shared/interfaces/icourse';
import { CoursesService } from '../../core/services/courses/courses.service';
import { BannerComponent } from "../../shared/components/banner/banner.component";
import { NgxNumberTickerComponent } from '@omnedia/ngx-number-ticker';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';
import { DeviceService } from '../../core/services/device/device.service';



@Component({
  selector: 'app-home',
  imports: [CourseCardComponent, BannerComponent, NgxNumberTickerComponent, CarouselModule, NgbNavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isMobile: boolean = false;


  constructor() {
    this.deviceService.isMobileDevice()
    window.addEventListener('resize', () => this.deviceService.isMobileDevice());
  }

  // checkDevice() {
  //   this.isMobile = window.innerWidth <= 599; // breakpoint for mobile
  // }

  readonly deviceService = inject(DeviceService)
  private readonly galleryService = inject(GalleryService)
  private readonly coursesService = inject(CoursesService)
  // readonly deviceService = inject(DeviceService)

  // isMobile = this.deviceService.isMobile
  platformID = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformID);
  sliderImages: ISlider[] = [];
  coursesList: ICourse[] = [];
  galleryImages: string[] = [];
  active = 1;

  ngOnInit(): void {

    this.galleryService.getSliderImages().subscribe({
      next: (res) => {
        this.sliderImages = res.Slider;
        this.galleryImages = res.Slider.map((p: { image: any; }) => p.image);
        console.log(this.galleryImages);
      }, error: (err) => {
        console.log(err);
      }
    })

    this.coursesService.getAllCourses().subscribe({
      next: (res) => {
        this.coursesList = res.Courses;
      }, error: (err) => {
        console.log(err);
      }
    })
    this.isMobileDevice()
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    center: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  filterCourses(category: string): ICourse[] {
    if (category === 'all') {
      return this.coursesList
        // .filter(c => c.showOnHomepage === true)
        .slice(0, 4);
    }
    return this.coursesList
      .filter(c => c.category === category)
      // .filter(c => c.showOnHomepage === true) 
      .slice(0, 4);
  }

  isMobileDevice(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false; // in case of SSR (Angular Universal, Next.js, etc.)
    }

    // Check User Agent for mobile devices
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

    if (/android/i.test(ua)) return true;
    if (/iPhone|iPad|iPod/i.test(ua)) return true;

    // Fallback: check screen width (you can adjust breakpoint)
    return window.innerWidth <= 768;
  }

}
