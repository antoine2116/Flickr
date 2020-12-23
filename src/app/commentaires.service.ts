import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommentairesService {
  constructor(private http: HttpClient) { }

  getCommentaires(idImg): Observable<any> {
    const idPhoto = idImg;
    // tslint:disable-next-line:variable-name
    const api_key = 'cce8a0825f735753d24813e640afe367';
    let url = 'https://www.flickr.com/services/rest/?method=flickr.photos.comments.getList&format=json&nojsoncallback=1';
    url += '&api_key=' + api_key;
    url += '&photo_id=' + idPhoto;

    return this.http.get(url);
  }
}
