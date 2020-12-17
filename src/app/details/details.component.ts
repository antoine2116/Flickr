import { Component, OnInit } from '@angular/core';
import {DetailService } from "../Detail.service";
import {CommentairesService} from "../commentaires.service";
import {FlickrImageInfos} from "../shared/flickrImageInfos.model";
import {FlickrCommentaires} from "../shared/flickrCommentaires";

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
/*
@Component({
  selector: 'app-commentaires',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class CommentairesComponent implements OnInit{
  username: string;
  content: string;
  date: string;

  constructor(private commentairesService: CommentairesService) { }

  ngOnInit(): void{
    this.commentairesService.getCommentaires().subscribe(
      data =>{
        let infosFlick = new FlickrCommentaires(data.comments.comment);
        console.log(infosFlick.date);
        this.username = infosFlick.name;
        this.content = infosFlick.content;
        this.date = infosFlick.date;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("J'ai fini");
      }
    )
  }
}*/
