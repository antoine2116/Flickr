import { Component, OnInit } from '@angular/core';
import {CommentairesService} from '../commentaires.service';
import {FlickrCommentairesModel} from '../shared/flickrCommentaires.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  constructor(private commentairesService: CommentairesService) { }
  comments: FlickrCommentairesModel[] = [];

  ngOnInit(): void {
  }

  //afficherCommentaires(): void{
    //this.commentairesService.getCommentaires().subscribe(
      //(data) => {
        //console.log(data);
        // this.comments = [];
        // data.comments.comment.forEach(el => {
          // var com = new FlickrCommentairesModel(data);
          // this.comments.push(com);

      //},
    // (error) => {
    //console.log(error);
    //},
    //() => {
    //  console.log('Commentaires récupérés avec succès');
    //}
    //);
    // }

}
