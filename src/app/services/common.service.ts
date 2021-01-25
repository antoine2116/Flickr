import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(private http: HttpClient) { }

  getImages() : Observable<any> {
    return this.http.get('http://localhost:8080/api/getImages/');
  }
}
