import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { ImagesService } from '../services/images.service';
import { FlickrImage} from '../shared/flickrImage.model'
import {DetailsComponent} from "../details/details.component";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  constructor(private imagesService: ImagesService) { }

  @ViewChild(DetailsComponent) detailsComponent: DetailsComponent;

  // Permet des stocker l'ensembles des images résultant de la recherche
  images: FlickrImage[] = [];

  ngOnInit(): void {
  }

  // Méthode délencher par le clique sur le bouton recherche
  // Appel les service ImagesService qui recherhe les photos associées filtre
  research($event): void {
    this.imagesService.getImages($event).subscribe(
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
        console.log(this.images);
        console.log("Images récupérées avec succès");
      }
  );
  }

  // Délenche le chargement du détails d'une photo
  imgEmitter(e) {
    this.detailsComponent.afficherDetails(e);
  }
}


