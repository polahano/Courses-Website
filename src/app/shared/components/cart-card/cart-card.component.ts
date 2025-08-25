import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { ICourse } from '../../interfaces/icourse';
import { DeviceService } from '../../../core/services/device/device.service';

@Component({
  selector: 'app-cart-card',
  imports: [],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.scss'
})
export class CartCardComponent {

  course: InputSignal<ICourse | undefined> = input<ICourse>();
  remove: any;

  deviceService = inject(DeviceService);

  onRemove(): void {
    this.remove.emit(this.course);
  }


}
