import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TagsService {
  constructor(private http : HttpClient) { }
  
  getTags() : Observable<any> {
    var api_key: string = "cce8a0825f735753d24813e640afe367"; 
    var url = "https://www.flickr.com/services/rest/?method=flickr.tags.getHotList&period=day&count=40&format=json&nojsoncallback=1";
    url += "&api_key=" + api_key;
    
    return this.http.get(url);
  }
}
