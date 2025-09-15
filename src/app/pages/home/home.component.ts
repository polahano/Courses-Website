import { Component } from '@angular/core';
import { HomeHeroComponent } from "./home-hero/home-hero.component";
import { HomeNumbersComponent } from "./home-numbers/home-numbers.component";
import { HomeGalleryComponent } from "./home-gallery/home-gallery.component";
import { HomeCoursesComponent } from "./home-courses/home-courses.component";



@Component({
  selector: 'app-home',
  imports: [HomeHeroComponent, HomeNumbersComponent, HomeGalleryComponent, HomeCoursesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
