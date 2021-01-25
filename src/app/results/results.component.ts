import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { ImagesService } from '../services/images.service';
import { FlickrImage} from '../shared/flickrImage.model';
import {DetailsComponent} from '../details/details.component';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  constructor(private imagesService: ImagesService, private commonService: CommonService) { }

  @ViewChild(DetailsComponent) detailsComponent: DetailsComponent;

  // Permet des stocker l'ensembles des images résultant de la recherche
  images: FlickrImage[] = [];

  ngOnInit() : void {
  }

  // Méthode délencher par le clique sur le bouton recherche
  // Appel les service ImagesService qui recherhe les photos associées filtre
  research($event) : void {
    this.imagesService.getImages($event).subscribe(
      (data) => {
        this.images = [];
        data.photos.photo.forEach(el => {
          const serverId: string = el.server;
          const id: string = el.id;
          const secret: string = el.secret;
          const url = `https://live.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
          const image = new FlickrImage(id, url);
          this.images.push(image);
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Images récupérées avec succès');
      }
    );

    this.commonService.getImages().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Images bdd récupérées avec succès');
      }
    );
  }

  // Délenche le chargement du détails d'une photo
  imgEmitter(e) : void {
    this.detailsComponent.afficherDetails(e);
  }
}


