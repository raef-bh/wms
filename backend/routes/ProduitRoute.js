const express = require('express')
const router = express.Router()
let Produit = require('../models/produitModel')

//selecter tous les produits
router.route('/').get((req,res) =>{
Produit.find()
.then(produit => res.json(produit))
.catch(err => res.status(400).json('erro' +err))
})
//ajouter  un produit
router.route('/ajouter').post((req, res) => {
    const  reference = req.body.reference;
    const categorie = req.body.categorie;   
    const libelle = req.body.libelle;  
    const prixHT = Number(req.body.prixHT);  
    const prixTTC   = Number(req.body.prixTTC);   
    const gerant= "5ed0ec85c37bf9406433e50d";  


    const ProduitModel = new Produit({
        reference,
        libelle,
        categorie,
        prixHT,
        prixTTC,
        gerant,
        
    });
    ProduitModel.save()
  .then(() => res.json("Produit added!"))
  .catch(err => res.status(400).json('Error: ' + err));
});
//recherche a une produit avec id "get http://localhost:3001/Produit/:id"
router.route('/:id').post((req, res) => {
    Produit.findById(req.params.id)
      .then(produit => res.json(produit))
      .catch(err => res.status(400).json('Error: ' + err));
});

//suppremer une produit avec id "delete http://localhost:3001/Produit/:id"
router.route('/:id').delete((req, res) => {
    Produit.findByIdAndDelete(req.params.id)
      .then(() => res.json('Produit deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  //calculer le nombre de produit
router.route('/countproduit').get(function(req,res){

  Produit.count({}, function(err, result){

      if(err){
          res.send(err)
      }
      else{
          res.json(result)
      }

 })

})

//modifier une produit avec id "post http://localhost:3001/Produit/update/:id"
router.route('/update/:id').post((req, res) => {
    Produit.findById(req.params.id)
      .then(produit => {
        produit.reference = req.body.reference;
        produit.categorie = req.body.categorie;
        produit.libelle = req.body.libelle;
        produit.prixHT = Number(req.body.prixHT);
        produit.prixTTC = Number(req.body.prixTTC);
  
        produit.save()
          .then(() => res.json('Produit updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router