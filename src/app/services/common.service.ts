import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ImagesService} from "./images.service";
import {FlickrImage} from "../shared/flickrImage.model";

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(private http: HttpClient) { }

  getImages() : Observable<any> {
    return this.http.get('http://localhost:8080/api/getImages/');
  }

  PostImages(imgs : FlickrImage[],event: any) : Observable<any> {
    var sendImgs = [];
  for(var img in imgs){
    var data = {id:imgs[img].id,date_research:new Date(), url:imgs[img].url,contexte: event.contexte,nsfw:event.nsfw,text:event.text,type:event.type,tag:event.tag,};
    sendImgs.push(data);
  }
  console.log(sendImgs);
    return this.http.post('http://localhost:8080/api/PostImages/',sendImgs);

  }
}
