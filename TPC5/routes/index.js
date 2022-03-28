var express = require('express');
var router = express.Router();
var axios = require('axios');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/musicas', function(req, res, next) {
  axios.get("http://localhost:3000/musicas")
    .then(response => {
      var lista = response.data
      res.render('musicas', {musicas: lista})
      })
      .catch(function(erro){

        res.render('error', { erro: 'erro' });
      })
});


router.get('/musicas/:id', function(req, res, next) {
  var al = req.params.id
  axios.get("http://localhost:3000/musicas/" + al)
    .then(response => {
      
      var ind = response.data
      res.render('musica', {musica: ind})
      })
      .catch(function(erro){
    
        res.render('error', { erro: 'erro' });
      })
});

router.get('/musicas/prov/:idProv', function(req, res, next) {
  var al = req.params.idProv
  axios.get("http://localhost:3000/musicas?prov=" + al)
    .then(response => {
      var lista = response.data
      res.render('provincia', {musicas: lista})
      })
      .catch(function(erro){
        //view, estrutura enviada
        res.render('error', { erro: 'erro' });
      })
});

module.exports = router;
