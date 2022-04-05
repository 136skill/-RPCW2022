var mongoose = require('mongoose')

var ficheiroSchema = new mongoose.Schema({
    data: String,
    nome: String,
    descricao: String,
    mimeType: String,
    size: Number
})

module.exports = mongoose.model('ficheiro', ficheiroSchema)