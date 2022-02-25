var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function(req,res) {
    var myurl = req.url.substring(9)
    console.log(myurl)
    console.log(req.url)
    var m = url.parse(req.url, true).pathname
    if(m == '/filmes'){
        fs.readFile("./html/index.html", function(err,data){
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
            if(err){
                res.write("<p> Erro na leitura do ficheiro </p>")
            }
            else{
                res.write(data)
            }
            res.end()
            })
         
        }
    else if(m == '/atores'){
        fs.readFile("./htmlAtores/atores.html", function(err,data){
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
            if(err){
                res.write("<p> Erro na leitura do ficheiro </p>")
            }
            else{
                res.write(data)
            }
            res.end()
            })
    }
    else if (m.includes('/atores/a')){
        fs.readFile("./htmlAtores/a" + myurl + ".html", function(err,data){
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
            if(err){
                res.write("<p> Erro na leitura do ficheiro </p>")
            }
            else{
                res.write(data)
                }
            res.end()
            })
    }
    else {
        fs.readFile("./html/f" + myurl + ".html", function(err,data){
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        if(err){
            res.write("<p> Erro na leitura do ficheiro </p>")
        }
        else{
            res.write(data)
            }
        res.end()
        })
    }

}).listen(7777)