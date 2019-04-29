var express = require('express');
var router = express.Router();
var Cinema = require('../controllers/cinema')

// GET FILMES 
router.get('/filmes', async function(req, res, next) {
   var dados = await Cinema.listarFilmes()
   res.jsonp(dados)
});

router.get('/filmes/:id', async function(req, res, next) {
    var dados = await Cinema.infoFilme(req.params.id)
    res.jsonp(dados)    
});
 
router.get('/filmes/:id/anos', async (req, res, next) => {
    var dados = await Cinema.filmeAnos(req.params.id)
    res.json(dados)        
});

router.get('/filmes/:id/atores', async (req, res, next) => {
    var dados = await Cinema.filmeAtores(req.params.id)
    res.json(dados)
});

router.get('/filmes/:id/generos', async (req, res, next) => {
    var dados = await Cinema.filmeGeneros(req.params.id)
    res.json(dados)
});

// GET ATORES
router.get('/atores', async (req, res, next) => {
    var dados = await Cinema.listarAtores()
    res.json(dados)
});

router.get('/atores/:id', async (req, res, next) => {
    var dados = await Cinema.infoAtor(req.params.id)
    res.json(dados)
});

router.get('/atores/:id/filmes', async (req, res, next) => {
    var dados = await Cinema.atorFilmes(req.params.id)
    res.json(dados)
});

// GET GENROS
router.get('/generos', async (req, res, next) => {
    var dados = Cinema.listarGeneros()
    res.json(dados)
});

router.get('/generos/:id/filmes', async (req, res, next) => {
    var dados = Cinema.generoFilmes(req.params.id)
    res.json(dados)
});



module.exports = router;
