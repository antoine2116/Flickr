import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FlickrImage} from "../shared/flickrImage.model";
import {Filtre} from '../shared/flickrFiltre.model';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(private http: HttpClient) { }

  // Appel à l'API permettant de récupérer les images en cache
  getImages(filtre : Filtre) : Observable<any> {
    return this.http.post('http://localhost:8080/api/getImages/', filtre);
  }

  // Appel à l'API permettant d'enregistrer les images dans le cache
  postImages(imgs: FlickrImage[], filtre: Filtre) : Observable<any> {
    const sendImgs = [];
    imgs.forEach(img => {
      const data = {
        id_flickr: img.id,
        created_on: new Date(),
        url: img.url,
        context: filtre.contexte,
        nsfw: filtre.nsfw,
        text: filtre.text,
        type: filtre.type
      };
      sendImgs.push(data);
    });
    return this.http.post('http://localhost:8080/api/postImages/', sendImgs);
  }
}
