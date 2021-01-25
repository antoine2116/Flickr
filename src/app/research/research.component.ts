import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Filtre } from '../shared/flickrFiltre.model';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})

export class ResearchComponent implements OnInit {
  @Output() tagEmitter = new EventEmitter<Filtre>();

  // Permet de stocker la liste des tags proposés dans le filtre de la barre de recherche
  tags: string[];
  // Permet de stocker l'ensembles des paramétre de la recherche
  filtre: Filtre = new Filtre();

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    // On fait un requête au service tagsService permettant de récupérer les tags les plus populaires
    this.tagsService.getTags().subscribe(
      (data) => {
        this.tags = [];
        data.hottags.tag.forEach(el => {
          this.tags.push(el._content);
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Tags récupéres avec succès ! ');
      });
  }
  // Emet un signal pour déclencher la recherches des photos en fonction du filtre
  emitResearch(): void {
    this.tagEmitter.emit(this.filtre);
  }
}
