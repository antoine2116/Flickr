import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Filtre } from './shared/filtre.model';

@Injectable({
  providedIn: 'root'
})

export class ImagesService {
  constructor(private http : HttpClient) { }
  
  getImages(filtre : Filtre) : Observable<any> {
    console.log(filtre);
    var api_key: string = "cce8a0825f735753d24813e640afe367"; 
    var url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1";
    url += "&api_key=" + api_key;
    url += "&per_page=50";
    url += "&text=" + filtre.text;
    url += filtre.dateMin != undefined ? "&min_upload_date=" + filtre.dateMin : "";
    url += filtre.dateMax != undefined ? "&max_upload_date=" + filtre.dateMax : "";
    url += filtre.nsfw != "" ? "&safe_search=" + filtre.nsfw : "";
    url += filtre.tri != "" ? "&sort=" + filtre.tri : "";
    url += filtre.type != "" ? "&content_type=" + filtre.type : "";
    url += filtre.contexte != "" ? "&geo_context=" + filtre.contexte : "";
    url += filtre.tags.length ? "&tags=" + filtre.tags.toString() : "";
    return this.http.get(url);
  }
}