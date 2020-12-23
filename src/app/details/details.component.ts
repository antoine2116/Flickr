import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {DetailService } from "../Detail.service";
import {FlickrImageInfos} from "../shared/flickrImageInfos.model";
import {FlickrImage} from "../shared/flickrImage.model";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  username : string;
  localisation : string;
  titre : string;
  tags : string[];
  date : string;
  views : bigint;
  url : string;
  infoImage : string[] = [];



  constructor(private detailService: DetailService) { }

  ngOnInit(): void {

  }
  afficherDetails($event: FlickrImage): void {
    this.detailService.getInfosImage($event.id).subscribe(
      data => {
      let infosFlick = new FlickrImageInfos(data.photo);
      this.url = $event.url;
      this.username = infosFlick.username;
      this.localisation = infosFlick.localisation;
      this.titre = infosFlick.description;
      this.tags = infosFlick.tags;
      this.date = infosFlick.datePoste;
      this.views = infosFlick.nbViews;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("C'est good!");
      }
    );
  }
}
