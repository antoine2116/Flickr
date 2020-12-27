import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommentairesService {
  constructor(private http: HttpClient) { }

  // Effectue une requête à l'API flickr.photos.comments
  // Permet de récupérer l'ensemble des commentaires d'une photo
  getCommentaires(idImg): Observable<any> {
    var url = 'https://www.flickr.com/services/rest/?method=flickr.photos.comments.getList&format=json&nojsoncallback=1';
    url += '&api_key=' + 'cce8a0825f735753d24813e640afe367';
    url += '&photo_id=' + idImg;

    return this.http.get(url);
  }
}
