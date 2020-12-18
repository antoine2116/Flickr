export class FlickrCommentairesModel{
  id: string;
  name: string;
  date: string;
  content: string;

  constructor(info) {
    this.id = info.id;
    this.name = info.name;
    this.date = info.date;
    this.content = info.content;
  }
}
