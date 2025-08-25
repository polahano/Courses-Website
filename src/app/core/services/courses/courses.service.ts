import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

  coursesCart = signal([]);
  totalPrice = signal(0);
  totalDiscount = signal(0);
  tax = 20;
  cartNumber = signal(0);


  getAllCourses(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/983f88db4d99fec8edd9`)
  }

}
