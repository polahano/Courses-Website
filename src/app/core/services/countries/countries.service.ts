import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient) { }

  getAllCountries(): Observable<any> {
    return this.httpClient.get('https://csc.sidsworld.co.in/api/countries')
  }

  getStatesByCountryId(countryId: string): Observable<any> {
    return this.httpClient.get(`https://csc.sidsworld.co.in/api/states/${countryId}`)
  }
}
