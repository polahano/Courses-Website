import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { ICourse } from '../../interfaces/icourse';

@Component({
  selector: 'app-cart-card',
  imports: [],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.scss'
})
export class CartCardComponent {

  course: InputSignal<ICourse | undefined> = input<ICourse>();
  remove: any;

  onRemove(): void {
    this.remove.emit(this.course);
  }


}
