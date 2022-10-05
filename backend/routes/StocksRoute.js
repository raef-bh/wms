const express = require('express')
const router = express.Router()
const Stocks = require('../models/StocksModel')

//lister le Stocks
router.route('/').get((req,res) =>{
Stocks.find()
.then(Stocks => res.json(Stocks))
.catch(err => res.status(400).json('Error:'+ err))
})
//ajouter un stock
router.route('/ajouter').post((req,res) =>{
 
  const fournisseur = req.body.fournisseur
  const date_achat = Date(req.body.date_achat) 
  const totale = Number(req.body.totale)
  const gerant= "5ed0ec85c37bf9406433e50d";  

  const StocksModel = new Stocks({
      fournisseur,
      date_achat,
      totale,
      gerant
  })
  StocksModel.save()
  .then(() => res.json("Stock added!"))
  .catch(err => res.status(400).json('Error' +err))
})
//supprimer un Stocks avec id 
router.route('/:id').delete((req,res) => {
 Stocks.findByIdAndDelete(req.params.id)
 .then(() => res.json('Stocks deleted'))
 .catch(err => res.status(400).json('Error'+err))
})
//modifier une produit avec id "post http://localhost:3001/Produit/update/:id"

router.route('/update/:id').post((req, res) => {
  Stocks.findById(req.params.id)
    .then(stocks => {
       stocks.fournisseur = req.body.fournisseur
       stocks.date_achat = Date(req.body.date_achat)
       stocks.totale = Number(req.body.totale)

      stocks.save()
        .then(() => res.json('stock  updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router