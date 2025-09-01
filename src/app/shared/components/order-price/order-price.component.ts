import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-price',
  imports: [],
  templateUrl: './order-price.component.html',
  styleUrl: './order-price.component.scss'
})
export class OrderPriceComponent {



  proceed = output<void>();
  // isCheckout = input(false);

  changeCheckoutState() {


    this.proceed.emit();

  }

  totalPrice = input(0);
  totalDiscount = input(0);
  tax = 20;

}
