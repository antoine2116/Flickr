var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongo = require('mongoose')
var cors = require('cors')

var db = mongo.connect("mongodb://localhost:27017/flickr", function (err, res) {
  if (err) {
    console.log(err)
  } else {
    console.log('Connecté à ' + db, ' + ', res);
  }
})

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

var Schema = mongo.Schema;

var imageSchema = new Schema({
  url : {type: String},
  date_research: {type: String},
  contexte: {type: String},
  nsfw: {type: String},
  tags : {type: String},
  text: {type: String},
  type: {type: String}

}, {versionKey: false});

var imageModel = mongo.model('images', imageSchema, 'images')

app.get("/api/getImages", function(req, res) {
  imageModel.find({}, function (err, data) {
    if (err) {
      res.send(err)
    }
    else {
      res.send(data)
      console.log(res.body);
    }
  })
});

app.post("/api/PostImages", function (req,res){
  imageModel.insertMany(req.body);
});

app.listen(8080, function () {
})

console.log("API Mongo écoute sur le port 8080 ! ")
