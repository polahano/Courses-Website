import { Component, input, InputSignal } from '@angular/core';
import { ICourse } from '../../interfaces/icourse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-card',
  imports: [RouterLink],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent {

  course: InputSignal<ICourse | undefined> = input<ICourse>();



}
