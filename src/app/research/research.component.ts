import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})

export class ResearchComponent implements OnInit {
  @Output() tagEmitter = new EventEmitter<string>();
  tag: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  emitResearch() {
    this.tagEmitter.emit(this.tag);

  }
}
