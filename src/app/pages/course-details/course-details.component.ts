import { Component, inject, input, InputSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { ICourse } from '../../shared/interfaces/icourse';
import { CoursesService } from '../../core/services/courses/courses.service';

@Component({
  selector: 'app-course-details',
  imports: [BreadcrumbComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent {

  private readonly coursesService = inject(CoursesService)
  private readonly activatedRoute = inject(ActivatedRoute)
  coursesList: ICourse[] = [];
  courseName: string = ''
  course: ICourse | undefined = {} as ICourse;


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.courseName = res.get('name')!;
        console.log(res);
      }, error: (err) => {
        console.log(err);
      }
    })
    this.coursesService.getAllCourses().subscribe({
      next: (res) => {
        this.coursesList = res.Courses;
        this.course = this.coursesList.find(c => c.title === this.courseName);
      }, error: (err) => {
        console.log(err);
      }
    })
  }


}
