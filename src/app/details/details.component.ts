import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {DetailService } from "../Detail.service";
import {FlickrImageInfos} from "../shared/flickrImageInfos.model";
import {FlickrImage} from "../shared/flickrImage.model";
import {CommentairesService} from "../commentaires.service";
import {FlickrCommentairesModel} from "../shared/flickrCommentaires.model";

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
  commentaires : FlickrCommentairesModel[] = [];


  constructor(private detailService: DetailService, private commentairesService: CommentairesService) { }

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
        console.log('C\'est good!');
        this.afficherCommentaires($event.id);
      }
    );
  }

  afficherCommentaires(id): void{
    this.commentaires = [];
    this.commentairesService.getCommentaires(id).subscribe(
      (data) => {
        console.log(data);
        console.log(data.comments.comment[0]._content);
        //const com = new FlickrCommentairesModel(data);
       // console.log(com);

        data.comments.comment.forEach(el => {
          console.log(el);
          var com = new FlickrCommentairesModel(el);
          console.log(com)
          this.commentaires.push(com);
          console.log(this.commentaires);

      },

      (error) => {
        console.log(error);
      },
      () => {
        console.log('Commentaires récupérés avec succès');
      }
    )
})
  }
}
