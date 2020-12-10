export class FlickrImageInfos {
  id: string;
  username : string;
  localisation : string;
  description : string;
  datePoste : string;
  nbViews : bigint;
  tags : string[];



    constructor(infos) {
        this.id = infos.id;
        this.username = infos.owner.username;
        this.localisation = infos.owner.location;
        this.description = infos.title._content;
        this.datePoste = infos.dates.taken;
        this.nbViews = infos.views;
        this.tags = [];
        infos.tags.tag.forEach(tag => {
          this.tags.push(tag.raw);
        });

    }


}
