import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }


  getAllCourses(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/983f88db4d99fec8edd9`)
  }

}
