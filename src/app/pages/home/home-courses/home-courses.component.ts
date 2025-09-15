import { Component, inject, OnInit } from '@angular/core';
import { CourseCardComponent } from "../../../shared/components/course-card/course-card.component";
import { DeviceService } from '../../../core/services/device/device.service';
import { CoursesService } from '../../../core/services/courses/courses.service';
import { ICourse } from '../../../shared/interfaces/icourse';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-courses',
  imports: [CourseCardComponent, NgbNavModule],
  templateUrl: './home-courses.component.html',
  styleUrl: './home-courses.component.scss'
})
export class HomeCoursesComponent implements OnInit {


  readonly deviceService = inject(DeviceService)
  private readonly coursesService = inject(CoursesService)

  coursesList: ICourse[] = [];
  active = 1;



  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (res) => {
        this.coursesList = res.Courses;
      }, error: (err) => {
        console.log(err);
      }
    })
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
