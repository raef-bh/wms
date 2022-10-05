const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose,6);
//cree schema
const LivreurSchema = new Schema({
    nom: { 
        type: String,
        required: true 
    },
    num_tel: { 
        type: Float,
        required: true 
    },
    vehicule_id: { 
        type: String,
        required: true 
    },
    lng: { 
        type: Float,
    },
    lat: { 
        type: Float,
    },
    speed: { 
        type: Float,
    },
    volts: { 
        type: Float,
    },

   
    gerant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'gerant'
    }
}, {timestamps: { createdAt: "created_at" }});

const Livreur = mongoose.model('Client', LivreurSchema);

module.exports = Livreur;