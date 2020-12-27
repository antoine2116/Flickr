import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {DetailService } from "../services/Detail.service";
import {FlickrImageInfos} from "../shared/flickrImageInfos.model";
import {FlickrImage} from "../shared/flickrImage.model";
import {CommentairesService} from "../services/commentaires.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  // Model stockant les informations relatives aux détails d'une photo
  imageInfos: FlickrImageInfos = new FlickrImageInfos();

  constructor(private detailService: DetailService, private commentairesService: CommentairesService) { }

  ngOnInit(): void {
  }

  // Méthode appeler après le clique sur une imag
  // Permet d'obtenir les détails de la photo en appeler le service concerné
  afficherDetails($event: FlickrImage): void {
    this.detailService.getInfosImage($event.id).subscribe(
      data => {
        this.imageInfos.addDetails($event.url, data.photo);
        this.afficherCommentaires($event.id);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Détails récupérés avec succès');
      }
    );
  }

  // Méthode appeler à la suite de la récupération du détails de l'image
  // Permet d'obtenir les commenatires lié à une photo
  afficherCommentaires(id): void{
    this.commentairesService.getCommentaires(id).subscribe(
      (data) => {
        this.imageInfos.addComments(data.comments);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Commentaires récupérés avec succès');
      }
    )
  }
}
