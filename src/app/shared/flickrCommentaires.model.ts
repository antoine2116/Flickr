export class FlickrCommentairesModel{
  id: string;
  name: string;
  date: string;
  content: string;

  constructor(info) {
    this.name = info.authorname;
    //this.date = info.date;
    this.content = info._content;
  }
}
