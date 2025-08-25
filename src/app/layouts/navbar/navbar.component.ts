import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CoursesService } from '../../core/services/courses/courses.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [BadgeModule, OverlayBadgeModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {


  coursesCount = 0;
  private readonly coursesService = inject(CoursesService)

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (res) => {
        this.coursesCount = res.Courses.filter((c: { addToCart: boolean; }) => c.addToCart === true).length;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }



}
