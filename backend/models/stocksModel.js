const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose,6);
//cree schema
const StocksSchema = new Schema({
   
    date_achat:{
        type:Date,
        default : Date.now,
        required:true
    },  
  totale:{
        type:Float,
        required:true
    },
    gerant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'gerant'
    },
    fournisseur: {
      type:String ,
      required: true 

    },
}, {timestamps: { createdAt: "created_at" }});
const Stocks = mongoose.model('Stocks', StocksSchema);
module.exports = Stocks;










