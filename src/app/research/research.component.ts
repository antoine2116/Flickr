import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Filtre } from '../shared/filtre.model';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})

export class ResearchComponent implements OnInit {
  @Output() tagEmitter = new EventEmitter<Filtre>();

  tags: string[];
  filtre : Filtre = new Filtre();
  constructor(private tagsService : TagsService) { }

  ngOnInit(): void {
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
        console.log("Tags récupéres avec succès ! ");
      });
  }

  emitResearch() {
    this.tagEmitter.emit(this.filtre);
  }
}
