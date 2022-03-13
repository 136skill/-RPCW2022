var http = require('http')
var url = require('url')
var axios = require('axios')


function generateMainPage() {
    var page = '<!DOCTYPE html><head><meta charset="UTF-8"><title> Alunos </title></head><body>'
    page += '<a href = /alunos> Lista de Alunos </a>'
    page += '<br>'
    page += '<a href = /cursos> Lista de Cursos </a>'
    page += '<br>'
    page += '<a href = /instrumentos> Lista de Instrumentos </a>'
    page += "</table></div></body></html>"
    return page
}


function get_requestA(){
    return axios.get('http://localhost:3000/alunos')
    .then(function(resp) {
        return resp.data;
    })
    .catch(function(error) {
        console.log(error)
});
}


function get_requestC(){
    return axios.get('http://localhost:3000/cursos')
    .then(function(resp) {
        return resp.data;
    })
    .catch(function(error) {
        console.log(error)
});
}


function get_requestI(){
    return axios.get('http://localhost:3000/instrumentos')
    .then(function(resp) {
        return resp.data;
    })
    .catch(function(error) {
        console.log(error)
});
}


function geraHtmlAlunos(res){
    var page = '<!DOCTYPE html><head><meta charset="UTF-8"><title> Alunos </title></head><body>'
    page += "<table><tr><th>ID</th><th>Nome</th><th>Data De Nascimento</th></tr>"
    // turmas = get_requestA()
    get_requestA().then(turmas => {
        turmas.forEach(a => {
            page += "<tr> <td>" + a.id +"</td> <td>" + a.nome +"</td> <td>"+ a.dataNasc + "</td> </tr>"})
    page += "</table></div></body></html>"
    res.write(page)
    res.end()
})
}


function geraHtmlCursos(res){
    var page = '<!DOCTYPE html><head><meta charset="UTF-8"><title> Cursos </title></head><body>'
    page += "<table><tr><th>ID</th><th>Designação</th><th>Duração</th><th>ID de Instrumento</th><th>Instrumento</th></tr>"
    get_requestC().then(curso => {
        curso.forEach(c => {
            page += "<tr> <td>" + c.id +"</td> <td>" + c.designacao +"</td> <td>"+ c.duracao + "</td> <td>"+ c.instrumento.id + "</td> <td>" + c.instrumento.text + "</td>  </tr>"})
    page += "</table></div></body></html>"
    res.write(page)
    res.end()
})
}


function geraHtmlInstrumentos(res){
    var page = '<!DOCTYPE html><head><meta charset="UTF-8"><title> Instrumentos </title></head><body>'
    page += "<table><tr><th>ID</th><th>Instrumento</th></tr>"
    get_requestI().then(inst => {
        inst.forEach(i => {
            page += "<tr> <td>" + i.id +"</td> <td>" + i.text + "</td> </tr>"})
    page += "</table></div></body></html>"
    res.write(page)
    res.end()
})
}


http.createServer(function (req, res) {
    var myurl = url.parse(req.url, true).pathname
    if (myurl == "/") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write(generateMainPage())
        res.end()
    }
    else if (myurl == "/alunos") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        geraHtmlAlunos(res)
    }
    else if (myurl == "/cursos") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        geraHtmlCursos(res)
    }
    else if (myurl == "/instrumentos") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        geraHtmlInstrumentos(res)
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
        res.end("<p>Rota inválida" + req.url + "</p>")
    }
}).listen(4000);

