const express = require('express')
const router = express.Router()
const Commande = require('../models/commandeModel')

//selecter tous les commandes
router.route('/').get((req,res) =>{
    Commande.find()
    .then(Commande => res.json(Commande))
    .catch(err => res.status(400).json('erro' +err))
    })
//ajouter une commande
router.route('/ajouter').post((req,res) =>{

    const reference = Number(req.body.reference)
    const libelle = req.body.libelle
    const quantite = Number(req.body.quantite)
    const prix =Number(req.body.prix)
    const totale = Number(req.body.totale)
    const livreur = req.body.livreur
    const date_livraison = Date(req.body.date_livraison)
    const description=req.body.description
    const etat = req.body.etat
    const gerant= "5ed0ec85c37bf9406433e50d";  
  
    const CommandeModel = new Commande({
        reference,
        libelle,
        quantite,
        prix,
        totale,
        gerant,
        livreur,
        date_livraison,
        description,
        etat
    })
    CommandeModel.save()
    .then(() => res.json("Commande added!"))
    .catch(err => res.status(400).json('Error' +err))
  })
  //supprimer un Commande avec id 
router.route('/:id').delete((req,res) => {
    Commande.findByIdAndDelete(req.params.id)
    .then(() => res.json('Commande deleted'))
    .catch(err => res.status(400).json('Error'+err))
   })
   //modifier une produit avec id "post http://localhost:3001/Produit/update/:id"
   
   router.route('/update/:id').post((req, res) => {
     Commande.findById(req.params.id)
       .then(Commande => {
          Commande.reference = Number(req.body.reference)
          Commande.libelle = req.body.libelle
          Commande.quantite = Number(req.body.quantite)
          Commande.prix =Number(req.body.prix)
          Commande.totale = Number(req.body.totale)
          Commande.livreur =req.body.livreur
          Commande.date_livraison =Date(req.body.date_livraison)
          Commande.description=req.body.description
          Commande.etat=req.body.etat
   
         Commande.save()
           .then(() => res.json('Commande  updated!'))
           .catch(err => res.status(400).json('Error: ' + err));
       })
       .catch(err => res.status(400).json('Error: ' + err));
   });


   module.exports = router
   