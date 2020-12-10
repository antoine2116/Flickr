import { Component, OnInit } from '@angular/core';
import {DetailService } from "../Detail.service";
import {FlickrImageInfos} from "../shared/flickrImageInfos.model";

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
  infoImage : string[] = [];
  constructor(private detailService: DetailService) { }

  ngOnInit(): void {

    this.detailService.getInfosImage().subscribe(
      data => {
      let infosFlick = new FlickrImageInfos(data.photo);
      console.log(infosFlick.localisation);
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
        console.log("J'ai fini");
      }
    );

  }





}
