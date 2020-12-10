import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../images.service';
import { FlickrImage} from '../shared/flickrImage.model'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  constructor(private imagesSerivce: ImagesService) { }
  images: FlickrImage[] = [];
  
  ngOnInit(): void {
  }

  research($event): void {
    this.imagesSerivce.getImages($event).subscribe(
      (data) => {
        this.images = [];
        data.photos.photo.forEach(el => {
          var serverId: string = el.server;
          var id: string = el.id;
          var secret: string = el.secret;

          var url: string = `https://live.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
        
          var image = new FlickrImage(id, url);
          this.images.push(image);
        });
      }, 
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Images récupérées avec succès");
      }
  );
  }
}
