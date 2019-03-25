var express = require('express')
var router = express.Router()
var axios = require('axios')

var endpoints = ['http://localhost:7200/repositories/tabelaPeriodica','https://dbpedia.org/sparql']
// ------------------Tratamento dos pedidos-------
/* GET users listing. */
router.get('/input', function(req, res, next) {
  res.render('getInput')
})

router.post('/input', function(req, res, next){
    var query = req.body.intext
    var encoded = encodeURI(query);
    console.log(encoded)
    axios.get(endpoints[0]+'?query='+encoded)
        .then(response => res.jsonp(response.data))
        .catch(err => console.log("Erro: " + err))
})

module.exports = router;
