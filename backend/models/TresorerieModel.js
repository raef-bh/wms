const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TresorerieModel = new Schema({

    date: { 
        type: Date,
        required: true
      }, 
      caisse: {    
        type:Number,
        required: true 
      },
      gerant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'gerant'
    }
    }, {timestamps: { createdAt: "created_at" }});







module.exports = mongoose.model('Tresorerie',TresorerieModel)