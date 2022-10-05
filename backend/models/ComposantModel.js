
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//cree schema
const ComposantSchema = new Schema({
  
  categorie: { 
    type: String, 
    required: true 
  },
  libelle:{
      required:true,
      type:String
  },
  prixHT :{
      type :Number,
      required:true
  },
  prixTTC :{
      type:Number,
      required :true

  },
  gerant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'gerant'
  },
}, {timestamps: { createdAt: "created_at" }});

const Composant = mongoose.model('Composant', ComposantSchema);

module.exports = Composant;
