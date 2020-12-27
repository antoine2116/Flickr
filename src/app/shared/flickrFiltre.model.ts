export class Filtre {
    // Principal
    text : string; 

    // Secondaires
    dateMin : string;
    dateMax : string;
    nsfw : string = "";
    tri : string = "";
    type : string = "";
    contexte : string = "";
    tags : string[] = [];
}
