const mongoose = require('mongoose')
const { modelName } = require('../models/ficheiro')
var Ficheiro =  require('../models/ficheiro')

module.exports.list = () => {
    return Ficheiro.find().sort({nome:1}).exec()
}

module.exports.lookUp = id => {
    return Ficheiro.findOne({_id: mongoose.Types.ObjectId(id)}).exec()
}

module.exports.insert = ficheiro => {
    var novofich = new Ficheiro(ficheiro)
    return novofich.save()
}

module.exports.delete = id => {
    return Ficheiro.deleteOne({_id:mongoose.Types.ObjectId(id)}).exec()
}