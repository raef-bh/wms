const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProduitSchema = new Schema({
   reference: { 
      type: Number,
      required: true ,
      lowercase: true,
      unique: true,
    },
 libelle: {
     type:String,
     required: true,
     minlength:3
 },
 categorie:{
    type:String,
    required: true,
    minlength:3
 },
 prixHT :{
    type:Number,
    required: true 
 },
 prixTTC :{
    type:Number,
    required: true 
 },
 gerant:{
   type: mongoose.Schema.Types.ObjectId,
   ref:'gerant'
}

},{timestamps: { createdAt: "created_at" }});

const Produit = mongoose.model('Produit',ProduitSchema)

module.exports = Produit;
