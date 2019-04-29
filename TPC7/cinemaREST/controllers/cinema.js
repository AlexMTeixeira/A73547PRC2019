const Cinema = module.exports;
const endpoit = "http://localhost:7200/repositories/cinema"
const axios = require('axios')

async function execQuery(q) {
    try {
        var encoded = encodeURIComponent(q);
        var response = await axios.get(endpoit + "?query=" + encoded)
        var vars = response.data.head.vars
        var res = response.data.results.bindings;
        var jsonList = [];
        for(i in res) {
            var json = {}
            for(j in vars) {
                json[vars[j]] = res[i][vars[j]].value;
            }
            jsonList.push(json);
        }
        return(jsonList)
    }
    catch(error) {
        return("ERRO: " + error)
    }
}

// CONTROLLER FILMES
Cinema.listarFilmes = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select * where {
            ?s  a       :Filme .
            ?s  :título ?tit ;
                :ano	?ano .
        } order by desc(?ano) ?tit`;
    
    return execQuery(query)
}

Cinema.infoFilme = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select * where {
            :${id}  :título    ?tit ;
                   :ano	      ?ano .
        }` ;
    return execQuery(query)
}

Cinema.filmeAnos = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?ano where {
            :${id}  :ano	      ?ano .
        }` ;
    return execQuery(query)
}

Cinema.filmeAtores = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?a ?nomeA where {
            :${id}  :temAtor	      ?a .
            ?a      :nome         ?nomeA .
        }` ;
    return execQuery(query)
}

Cinema.filmeGeneros = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?g where {
            :${id}  :temGénero	  ?g .
        }` ;
    return execQuery(query)
}

// CONTROLLER ATORES

Cinema.listarAtores = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?s ?nome where {
            ?s  a       :Pessoa .
            ?s  :atuou  ?a .
            ?s  :nome   ?nome .
        } order by ?nome`;
    return execQuery(query)
}

Cinema.infoAtor = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?nome where {
            :${id}  :nome   ?nome .
        }` ;
    return execQuery(query)
}

Cinema.atorFilmes = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?f ?ftit where {
            :${id}  :atuou	      ?f .
            ?f      :título         ?ftit .
        }` ;
    return execQuery(query)
}

// CONTROLLER GENERO
Cinema.listarGeneros = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?s where {
            ?s  a       :Género .
        } order by ?s`;
    return execQuery(query)
}

Cinema.generoFilmes = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
        select ?f ?ftit where {
            :${id}  :éGéneroDe	  ?f .
            ?f     :título      ?ftit
        }` ;
    return execQuery(query)
}