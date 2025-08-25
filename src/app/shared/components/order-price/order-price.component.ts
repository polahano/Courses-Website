import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-order-price',
  imports: [RouterLink],
  templateUrl: './order-price.component.html',
  styleUrl: './order-price.component.scss'
})
export class OrderPriceComponent {


  proceed = output<void>();
  isCheckout = input(false);

  changeCheckoutState() {
    this.proceed.emit();
  }

  totalPrice = input(0);
  totalDiscount = input(0);
  tax = 20;

}
