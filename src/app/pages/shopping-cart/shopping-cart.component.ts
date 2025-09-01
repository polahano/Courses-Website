import { Component, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { CoursesService } from '../../core/services/courses/courses.service';
import { CartCardComponent } from "../../shared/components/cart-card/cart-card.component";
import { ICourse } from '../../shared/interfaces/icourse';
import { ButtonModule } from 'primeng/button';
import { OrderPriceComponent } from "../../shared/components/order-price/order-price.component";
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';



@Component({
  selector: 'app-shopping-cart',
  imports: [BreadcrumbComponent, CartCardComponent, ButtonModule, OrderPriceComponent, RouterOutlet, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

  readonly cousesService = inject(CoursesService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isCheckout = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.route.firstChild?.routeConfig?.path === 'checkout'),
      startWith(this.route.firstChild?.routeConfig?.path === 'checkout')
    ),
    { initialValue: false }
  );


  ngOnInit(): void {
    this.cousesService.getAllCourses().subscribe({
      next: (res) => {
        this.cousesService.coursesCart.set(res.Courses.filter((c: { addToCart: boolean; }) => c.addToCart === true));
        this.cousesService.cartNumber.set(this.cousesService.coursesCart().length);
        this.cousesService.totalPrice.set(this.cousesService.coursesCart().reduce((sum, course: ICourse) => sum + course.price, 0));
        this.cousesService.totalDiscount.set(this.cousesService.coursesCart().reduce((sum, course: ICourse) => sum + course.discount, 0));
      }, error: (err) => {
        console.log(err);
      }
    })
  }


}
