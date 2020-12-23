import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { ImagesService } from '../images.service';
import { FlickrImage} from '../shared/flickrImage.model'
import {DetailsComponent} from "../details/details.component";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  constructor(private imagesSerivce: ImagesService) { }
  @ViewChild(DetailsComponent) detailsComponent: DetailsComponent;

  images: FlickrImage[] = [];
  url = "";
  id = 0;
  imgDetail: any = {};

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

  @Output() tagEmitter = new EventEmitter<string>();

  imgEmitter(e) {
    this.detailsComponent.afficherDetails(e);
  }


}


