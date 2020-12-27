import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  constructor(private http : HttpClient) {
  }

  // Effectue une requête à l'API flickr.photos.getInfo
  // Permet de récupérer l'ensemble des informations lié à une photo
  getInfosImage(idphoto : string): Observable<any> {
    let url = 'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&format=json&nojsoncallback=1';
    url += '&api_key=' + 'cce8a0825f735753d24813e640afe367';
    url += '&photo_id=' + idphoto;

  return this.http.get(url);
  }
}


