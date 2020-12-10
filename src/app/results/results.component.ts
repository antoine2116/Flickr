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
  results: FlickrImage[] = [];

  ngOnInit(): void {
    this.imagesSerivce.getImages().subscribe(
        (data) => {
          data.photos.photo.forEach(el => {
            var serverId: string = el.server;
            var id: string = el.id;
            var secret: string = el.secret;

            var url: string = `https://live.staticflickr.com/${serverId}/${id}_${secret}.jpg`;

            var image = new FlickrImage(id, url);
            this.results.push(image);
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
