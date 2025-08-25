import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContainerComponent } from './layouts/container/container.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: ContainerComponent, data: { breadcrumb: 'Home' }, children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'courses/:name',
                component: CourseDetailsComponent,
                // data: { breadcrumb: 'Course' }
            },
            {
                path: 'categories', data: { breadcrumb: 'Categories' }, children: [
                    {
                        path: 'details', data: { breadcrumb: 'Details' }, children: [
                            {
                                path: 'shopping-cart', component: ShoppingCartComponent, data: { breadcrumb: 'Shopping Cart' }, children: [
                                    { path: 'checkout', component: CheckoutComponent, data: { breadcrumb: 'Checkout' } },
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'order-complete',
                component: OrderCompleteComponent,
            },
        ]
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
