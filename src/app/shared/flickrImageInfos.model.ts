import { FlickrCommentairesModel } from "./flickrCommentaires.model";

export class FlickrImageInfos {
  username : string;
  localisation : string;
  titre : string;
  tags : string[];
  date : string;
  views : bigint;
  url : string;
  commentaires : FlickrCommentairesModel[] = [];

  addDetails(url:string, infosFlick:any) {
    this.url = url;
    this.username = infosFlick.owner.username;
    this.localisation = infosFlick.owner.location;
    this.titre = infosFlick.title._content;
    this.date = infosFlick.dates.taken;
    this.views = infosFlick.views;
    this.tags = [];
    infosFlick.tags.tag.forEach(tag => {
      this.tags.push(tag.raw);
    });
  }

  addComments(comments:any): void  {
      if (comments.comment != undefined) {
      comments.comment.forEach(el => {
        var com = new FlickrCommentairesModel(el);
        this.commentaires.push(com);
      });
    }
  }
}
