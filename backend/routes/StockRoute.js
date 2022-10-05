const express = require('express')
const router = express.Router()
const Stock = require('../models/stockModel')

//lister le stock
router.route('/').get((req,res) =>{
Stock.find()
.then(Stock => res.json(Stock))
.catch(err => res.status(400).json('Error:'+ err))
})
//ajouter un stock
router.route('/ajouter').post((req,res) =>{

  const reference = Number(req.body.reference)
  const libelle = req.body.libelle
  const date_achat = Date(req.body.date_achat)
  const quantite = Number(req.body.quantite)
  const prix =Number(req.body.prix)
  const totale = Number(req.body.totale)
  const gerant= "5ed0ec85c37bf9406433e50d";  

  const StockModel = new Stock({
      reference,
      libelle,
      date_achat,
      quantite,
      prix,
      totale,
      gerant
  })
  StockModel.save()
  .then(() => res.json("Stock added!"))
  .catch(err => res.status(400).json('Error' +err))
})
//supprimer un stock avec id 
router.route('/supprimer/:id').post((req,res) => {
 Stock.findByIdAndDelete(req.params.id)
 .then(() => res.json('Stock deleted'))
 .catch(err => res.status(400).json('Error'+err))
})
//modifier une produit avec id "post http://localhost:3001/Produit/update/:id"

router.route('/update/:id').post((req, res) => {
  Stock.findById(req.params.id)
    .then(stock => {
       stock.reference = Number(req.body.reference)
       stock.libelle = req.body.libelle
       stock.date_achat = Date(req.body.date_achat)
       stock.quantite = Number(req.body.quantite)
       stock.prix =Number(req.body.prix)
       stock.totale = Number(req.body.totale)

      stock.save()
        .then(() => res.json('stock  updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router