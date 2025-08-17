import { Component, inject, OnInit } from '@angular/core';
import { ISlider } from '../../shared/interfaces/islider';
import { GalleryService } from '../../core/services/gallery/gallery.service';
import { CourseCardComponent } from "../../shared/components/course-card/course-card.component";
import { ICourse } from '../../shared/interfaces/icourse';
import { CoursesService } from '../../core/services/courses/courses.service';
import { CarouselComponent } from "../../shared/components/carousel/carousel.component";
import { chmod } from 'fs';

@Component({
  selector: 'app-home',
  imports: [CourseCardComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly galleryService = inject(GalleryService)
  private readonly coursesService = inject(CoursesService)
  sliderImages: ISlider[] = [];
  coursesList: ICourse[] = [];
  galleryImages: string[] = [];
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


}
