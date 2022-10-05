const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//cree schema
const FournisseurSchema = new Schema({
    nom: { 
        type: String,
        required: true 
    },
    prenom: { 
        type: String,
        required: true 
    },
    tel: { 
        type: Number,
        required: true 
    },
    email: { 
        type: String,
        lowercase: true,
        unique: true,
        required: true 
    },
    gerant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'gerant'
    }
}, {timestamps: { createdAt: "created_at" }});

const Fournisseur = mongoose.model('Fournisseur', FournisseurSchema);

module.exports = Fournisseur;