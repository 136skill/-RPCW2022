var express = require('express');
var fs = require('fs')
var multer = require('multer')
var router = express.Router();

var Ficheiro = require('../controllers/ficheiro');
const ficheiro = require('../models/ficheiro');


var upload = multer({dest:'uploads'})


router.get('/', function(req, res, next) {
  Ficheiro.list()
  .then(data => res.render('index', {list:data}))
  .catch(error => res.render('error',{error:error}))
});



router.post('/', upload.single('myFile'), (req,res) => {
  var d = new Date().toISOString().substring(0,16)
  let oldPath =  __dirname + '/../' + req.file.path
  let newPath = __dirname + '/../fileStore/' + req.file.originalname

  fs.rename(oldPath,newPath, erro =>{
    if(erro) res.render('error',{error:erro})
  })

  var fich = {
    data : d,
    nome : req.file.originalname,
    descricao : req.body.descricao,
    mimeType : req.file.mimetype,
    size : req.file.size
  }

  Ficheiro.insert(fich)
  .then(() => {res.redirect(301,'/')})
  .catch(erro => {res.render('erro',{error:erro})})

});


router.post('/:id',(req,res)=>{
  Ficheiro.lookUp(req.params.id)
      .then(data => {
        var path = __dirname + '/../fileStore/' + data.nome
        fs.unlink(path, erro => {
          if(erro) res.render('error', {error:erro})
        })
      })
      .catch(erro => {res.render('error',{error:erro})})

  Ficheiro.delete(req.params.id)
      .then(() => {res.redirect('/')} )
      .catch(erro => {res.render('error',{error:erro})})
});

module.exports = router;
