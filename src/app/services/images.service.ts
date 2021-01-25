import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filtre } from '../shared/flickrFiltre.model';

@Injectable({
  providedIn: 'root'
})

export class ImagesService {
  constructor(private http: HttpClient) { }
  // Effectue une requête à l'API flickr.photos.search
  // Permet de récupérer l'ensemble des photos en fonction du filtre
  getImages(filtre: Filtre) : Observable<any> {
    const apiKey = 'cce8a0825f735753d24813e640afe367';
    let url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1';

    url += '&api_key=' + apiKey;
    url += '&per_page=100';
    url += '&text=' + filtre.text;
    url += filtre.dateMin !== undefined ? '&min_upload_date=' + filtre.dateMin : '';
    url += filtre.dateMax !== undefined ? '&max_upload_date=' + filtre.dateMax : '';
    url += filtre.nsfw !== '' ? '&safe_search=' + filtre.nsfw : '';
    url += filtre.tri !== '' ? '&sort=' + filtre.tri : '';
    url += filtre.type !== '' ? '&content_type=' + filtre.type : '';
    url += filtre.contexte !== '' ? '&geo_context=' + filtre.contexte : '';
    url += filtre.tags.length ? '&tags=' + filtre.tags.toString() : '';
    return this.http.get(url);
  }

}
