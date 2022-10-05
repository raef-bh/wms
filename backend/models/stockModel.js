const mongoose = require ('mongoose')

const stockSchema = mongoose.Schema({
  
    reference : {
        type : Number,
        required:true
    },
    libelle :{
        type:String,
        required:true
    },
    date_achat:{
        type:Date,
        default : Date.now,
        required:true
    },
    quantite:{
        type :Number,
        required:true
    },
    prix:{
        type:Number,
        required:true
    },
    totale:{
        type:Number,
        required:true
    },
    gerant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'gerant'
    }
    

},{timestamps: { createdAt: "created_at" }})

module.exports = mongoose.model('Stock',stockSchema)