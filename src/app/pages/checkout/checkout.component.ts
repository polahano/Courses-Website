import { Component, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { FormControl, FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageModule, Message } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CountriesService } from '../../core/services/countries/countries.service';
import { ICountry, IState } from '../../shared/interfaces/icountry';
import { ICourse } from '../../shared/interfaces/icourse';
import { PasswordModule } from 'primeng/password';
import { DatePickerModule } from 'primeng/datepicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';




interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-checkout',
  imports: [BreadcrumbComponent, AutoCompleteModule, InputMaskModule, AutoComplete, FormsModule, InputNumberModule, ReactiveFormsModule, PasswordModule, DatePickerModule, RadioButtonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {





  private readonly countryService = inject(CountriesService)

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

  formSubmitted: boolean = false;
  date: Date | undefined;


  checkoutForm: FormGroup = new FormGroup({
    country: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    cardName: new FormControl(null, [Validators.required]),
    cardNumber: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{16}$/)]),
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
    console.log(this.checkoutForm.get('country')?.errors, event.query.toLowerCase());
    if (this.checkoutForm.get('country')?.errors === null) {
      this.checkoutForm.get('state')?.enable();
      this.getAllStates();
    } else {
      this.checkoutForm.get('state')?.disable();
    }
  }

  onCountrySelected($event: AutoCompleteSelectEvent) {
    if (this.checkoutForm.get('country')?.errors === null) {
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
        console.log(this.statesNames());
      }, error: (err) => {
        console.log(err);
      }
    })
  }



  onSubmit() {
    this.formSubmitted = true;
    if (this.checkoutForm?.valid) {
      this.checkoutForm.reset();
      this.formSubmitted = false;
    }
  }

  isInvalid(controlName: string) {
    const control = this.checkoutForm?.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

}
