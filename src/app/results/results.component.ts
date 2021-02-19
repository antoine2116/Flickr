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

  // Permet des stocker l'ensemble des images résultant de la recherche
  images: FlickrImage[] = [];

  ngOnInit() : void {
  }

  // Méthode déclenchée par le clique sur le bouton recherche
  research($filtre) : void {
    this.images = [];

    // En premier temps, on fait appel au cache pour récupérer les éventuelles images
    this.commonService.getImages($filtre).subscribe(
      (data) => {
        data.forEach(img => {
          const image = new FlickrImage(img.id_flickr, img.url)
          this.images.push(image);
        });
      },
      (error) => {
        console.log(error);
      },

      () => {
        // Une fois l'appel effectué, on vérifie si il y a des images dans le cache
        if (this.images.length != 0) {
          console.log('BDD - Images bdd récupérées avec succès');
        }
        // Si il n'y a pas d'images, alors on fait appel à l'API Flickr
        else {
          this.imagesService.getImages($filtre).subscribe(
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
              // Une fois les images récupérées, on les enregistre dans le cache
              console.log('FLICKR - Images récupérées avec succès');
              this.commonService.postImages(this.images, $filtre).subscribe(
                (data) => {},
                (error) => {
                  console.log(error);
                },
                () => {
                  console.log('BDD - Images sauvegardées avec succès');
                }
              );
            }
          );
        }
      }
    );
  }

  // Déclenche le chargement du détails d'une photo
  imgEmitter(e) : void {
    this.detailsComponent.afficherDetails(e);
  }
}


