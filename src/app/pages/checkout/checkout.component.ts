import { Component, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { AutoCompleteModule, AutoCompleteSelectEvent, AutoComplete } from 'primeng/autocomplete';
import { FormControl, FormsModule } from '@angular/forms';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CountriesService } from '../../core/services/countries/countries.service';
import { ICountry, IState } from '../../shared/interfaces/icountry';
import { PasswordModule } from 'primeng/password';
import { DatePickerModule } from 'primeng/datepicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { OrderPriceComponent } from "../../shared/components/order-price/order-price.component";
import { CoursesService } from '../../core/services/courses/courses.service';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { formatDate } from '@angular/common';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-checkout',
  imports: [
    BreadcrumbComponent,
    InputTextModule,
    AutoCompleteModule,
    InputMaskModule,
    AutoComplete,
    FormsModule,
    InputNumberModule,
    ReactiveFormsModule,
    PasswordModule,
    DatePickerModule,
    RadioButtonModule,
    OrderPriceComponent, ConfirmDialog, ToastModule, ButtonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

  isFormValidated: boolean = false


  private readonly countryService = inject(CountriesService)
  readonly cousesService = inject(CoursesService);
  private readonly router = inject(Router);


  countryList: ICountry[] = [];
  statesList: IState[] = [];
  countryNames = signal<string[]>([])
  statesNames = signal<string[]>([])
  filteredCountries = signal<string[]>([])
  filteredStates = signal<string[]>([])

  readonly today = new Date();

  readonly month = this.today.getMonth();
  readonly year = this.today.getFullYear();

  readonly currentMonthDate = new Date(this.year, this.month, 1);

  date: Date | undefined;


  checkoutForm: FormGroup = new FormGroup({
    country: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    cardName: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z]+( [A-Za-z]+){1,3}$/)]),
    cardNumber: new FormControl(null, [Validators.required]),
    expiryDate: new FormControl(null, [Validators.required]),
    cvv: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{3}$/)]),
  }
  );

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe({
      next: (res) => {
        this.countryList = res.countries
        this.countryNames.set(this.countryList.map((item: ICountry) => item.name));
      }, error: (err) => {
        console.log(err);
      }
    })
    this.checkoutForm.get('state')?.disable();
  }

  searchCountries(event: AutoCompleteCompleteEvent) {
    this.checkoutForm.get('state')?.disable();
    this.checkoutForm.patchValue({ state: null });
    this.filteredCountries.set(this.countryNames().filter(item => item.toLowerCase().includes(event.query.toLowerCase())));
    if (this.countryNames().includes(event.query.charAt(0).toUpperCase() + event.query.slice(1))) {
      this.checkoutForm.get('state')?.enable();
    } else {
      this.checkoutForm.get('state')?.disable();
    }
  }

  onCountrySelected(event: AutoCompleteSelectEvent) {
    if (this.countryNames().includes(event.value)) {
      this.checkoutForm.get('state')?.enable();
      this.getAllStates();
    } else {
      this.checkoutForm.get('state')?.disable();
      this.checkoutForm.patchValue({ state: null });
    }
  }


  searchStates(event: AutoCompleteCompleteEvent) {
    if (this.checkoutForm.get('country')?.value !== null) {
      this.filteredStates.set(this.statesNames().filter(item => item.toLowerCase().includes(event.query.toLowerCase())));
    }
  }


  getAllStates() {
    const countryName = this.checkoutForm.get('country')?.value;
    const countryObject = this.countryList.find((c: ICountry) => c.name === countryName);
    this.countryService.getStatesByCountryId(String(countryObject?.id)).subscribe({
      next: (res) => {
        this.statesList = res.states
        this.statesNames.set(this.statesList.map((item: IState) => item.name));
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  onSubmit(event: MouseEvent) {

    if (!this.countryNames().includes(this.checkoutForm.get('country')?.value)) {
      this.checkoutForm.get('country')?.markAsDirty();

    }

    if (!this.statesNames().includes(this.checkoutForm.get('state')?.value)) {
      this.checkoutForm.get('state')?.markAsDirty();
    }

    if (!this.checkoutForm.get('cardName')?.valid) {
      this.checkoutForm.get('cardName')?.markAsDirty();
    }
    if (!this.checkoutForm.get('cardNumber')?.valid) {
      this.checkoutForm.get('cardNumber')?.markAsDirty();
    }
    if (!this.checkoutForm.get('expiryDate')?.valid) {
      this.checkoutForm.get('expiryDate')?.markAsDirty();
    }
    if (!this.checkoutForm.get('cvv')?.valid) {
      this.checkoutForm.get('cvv')?.markAsDirty();
    }

    if (this.checkoutForm.valid) {
      this.confirmInputs(event);
    }
  }

  confirmInputs(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure that you want to proceed with these information?<br><br>
                Country: ${this.checkoutForm.get('country')?.value}<br>
                State: ${this.checkoutForm.get('state')?.value}<br><br>
                Card Details:<br>
                Card Name: ${this.checkoutForm.get('cardName')?.value}<br>
                Card Number: ${this.checkoutForm.get('cardNumber')?.value}<br>
                Expiry Date: ${formatDate(this.checkoutForm.get('expiryDate')?.value, 'MMM yyyy', 'en-US')}`
      ,
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Proceed',
      },
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Payment done successfully' });
        setTimeout(() => {
          this.router.navigate(['/order-complete'])
        }, 1000);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Payment declined',
          life: 3000,
        });
      },
    });
  }

  isInvalid(controlName: string) {
    const control = this.checkoutForm.get(controlName);
    return control?.invalid && control.touched;
  }

  onCardInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
    this.checkoutForm.get('cardNumber')!.setValue(formatted, { emitEvent: false });
  }

}
