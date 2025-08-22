import { Component, inject, OnInit } from '@angular/core';
import { ISlider } from '../../shared/interfaces/islider';
import { GalleryService } from '../../core/services/gallery/gallery.service';
import { CourseCardComponent } from "../../shared/components/course-card/course-card.component";
import { ICourse } from '../../shared/interfaces/icourse';
import { CoursesService } from '../../core/services/courses/courses.service';
import { BannerComponent } from "../../shared/components/banner/banner.component";
import { NgxNumberTickerComponent } from '@omnedia/ngx-number-ticker';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-home',
  imports: [CourseCardComponent, BannerComponent, NgxNumberTickerComponent, CarouselModule, NgbNavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly galleryService = inject(GalleryService)
  private readonly coursesService = inject(CoursesService)
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

      }
    })

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
      return this.coursesList.slice(0, 4);
    }
    return this.coursesList
      .filter(c => c.category === category)
      .slice(0, 4);
  }

}
