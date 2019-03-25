var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:7200/repositories')
      .then(data => {
        var ret = []
        obj = data.data.results.bindings
        for(i in obj) {
          ret.push({id: obj[i].id.value})
        }
        res.render('index', {repositories: ret})
      })
      .catch(err => console.log("Error: " + err))
})

router.get('/sparql/:uri', (req,res,next) => {
  res.render('inputRep', {uri: req.params.uri})
})

router.post('/sparql/:uri', (req, res, next) => {
    var query = req.body.intext
    var encoded = encodeURIComponent(query);
    var endpoint = 'http://localhost:7200/repositories/'+req.params.uri
    var format = req.body.format
    if(format == "xml")
      var accept = "application/sparql-results+xml"
    else var accept = "application/sparql-results+json"
    axios.get(endpoint+'?query='+encoded, { headers: {"Accept": accept} })
        .then(response => {
          res.jsonp(response.data)
        })
        .catch(err => console.log("Erro: " + err))
})

module.exports = router;
