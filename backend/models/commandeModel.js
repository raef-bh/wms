const mongoose = require('mongoose')
const Schema = mongoose.Schema
var Float = require('mongoose-float').loadType(mongoose,6);
const CommandeSchema = new Schema({
    reference :{
        type : Float,
       
    },
    date_livraison :{
        type: Date,
        default: Date.now,
        required : true
    },
    livreur :{
        type : String,
        required : true
    },
    libelle :{
        type : String,
       
    },
    prix : {
        type : Float,
       
    },
    quantite :{
        type : Float,
      
    },
    totale :{
        type : Float ,
        required : true
    },
    description :{
        type :String,
       
    },
    etat :{
        type : String,
    },
    gerant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'gerant'
    }


},{timestamps: { createdAt: "created_at" }})

module.exports = mongoose.model('Commande',CommandeSchema)
