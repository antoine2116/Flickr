var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongo = require('mongoose')
var cors = require('cors')

// Connexion à la base MongoDB
var db = mongo.connect("mongodb://localhost:27017/flickr", function (err, res) {
  if (err) {
    console.log(err)
  } else {
    console.log('Connecté à ' + db, ' + ', res);
  }
})

// Configuration de l'API
var app = express()
app.use(cors())
app.use(bodyParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// Déclaration du model
var Schema = mongo.Schema;
var imageSchema = new Schema({
  id_flickr: {type: String},
  created_on: {type: String},
  url : {type: String},
  context: {type: String},
  nsfw: {type: String},
  text: {type: String},
  type: {type: String}

}, {versionKey: false});

var imageModel = mongo.model('images', imageSchema, 'images');

// Permet de récupérer les images stockées dans la base de données
app.post("/api/getImages", function(req, res) {
  // On supprime les images datant de plus de 6h
  let dateMax = new Date();
  dateMax.setHours(dateMax.getHours() - 6);
  imageModel.remove({
    created_on : {
      $lt: dateMax.toISOString()
    }
  }, (err, data) => {
    if (err) {
      console.log(err)
    } else if (data) {
      console.log(data);
    }
  });

  // On recherche les images correspondant au filtre
  const filtre = req.body;
  imageModel.find({
    context: filtre.contexte,
    nsfw: filtre.nsfw,
    text: filtre.text,
    type: filtre.type
  }, (err, images) => {
    if (images) {
      res.status(200).json(images);
    }
  });

});

// Permet d'enregistrer les images dans la base de données
app.post("/api/postImages", function (req,res){
  // On ajoute les nouvelles images
  imageModel.insertMany(req.body);
});

app.listen(8080, function () {
});

console.log("L'API Mongo écoute sur le port 8080 ! ");
