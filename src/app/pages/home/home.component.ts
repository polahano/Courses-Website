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


  // constructor() {
  //   if(isPlatformBrowser(this.platformID)){
  //     this.deviceService.isMobileDevice()
  //   window.addEventListener('resize', () => this.deviceService.isMobileDevice());
  //   }

  // }

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

    if (this.isBrowser) {
      this.deviceService.isMobileDevice();

      // Handle resize safely
      window.addEventListener('resize', () => this.deviceService.isMobileDevice());
    }


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
  }

  customOptions: OwlOptions = {
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

}
