export class FlickrCommentairesModel{
  name: string;
  content: string;

  constructor(info) {
    this.name = info.authorname;
    this.content = info._content;
  }
}
