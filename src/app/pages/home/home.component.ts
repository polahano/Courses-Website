import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ISlider } from '../../shared/interfaces/islider';
import { GalleryService } from '../../core/services/gallery/gallery.service';
import { CourseCardComponent } from "../../shared/components/course-card/course-card.component";
import { ICourse } from '../../shared/interfaces/icourse';
import { CoursesService } from '../../core/services/courses/courses.service';
import { NgxNumberTickerComponent } from '@omnedia/ngx-number-ticker';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';
import { DeviceService } from '../../core/services/device/device.service';



@Component({
  selector: 'app-home',
  imports: [CourseCardComponent, NgxNumberTickerComponent, CarouselModule, NgbNavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isMobile: boolean = false;



  readonly deviceService = inject(DeviceService)
  private readonly galleryService = inject(GalleryService)
  private readonly coursesService = inject(CoursesService)

  platformID = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformID);
  sliderImages: ISlider[] = [];
  coursesList: ICourse[] = [];
  galleryImages: string[] = [];
  active = 1;

  ngOnInit(): void {

    if (this.isBrowser) {
      this.deviceService.isMobileDevice();
      window.addEventListener('resize', () => this.deviceService.isMobileDevice());
    }


    this.galleryService.getSliderImages().subscribe({
      next: (res) => {
        this.sliderImages = res.Slider;
        this.galleryImages = res.Slider.map((p: { image: any; }) => p.image);
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
