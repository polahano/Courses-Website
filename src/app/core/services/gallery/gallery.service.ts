import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private httpClient: HttpClient) { }

  getSliderImages(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/8494c045d50509ba0d5a`)
  }


}
