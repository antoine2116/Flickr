import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  urlBase = 'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=c978438c8cc7ec853341dde4df7db9fb&photo_id=50702402907&format=json&nojsoncallback=1';
  constructor(private http : HttpClient) {
  }

  getInfosImage(): Observable<any> {
    const idPhoto = '50702402907';
    const api_key = 'cce8a0825f735753d24813e640afe367';
    let url = 'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&format=json&nojsoncallback=1';
    url += '&api_key=' + api_key;
    url += '&photo_id=' + idPhoto;

  return this.http.get(url);
  }
}


