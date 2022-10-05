const express = require('express')
const router = express.Router()
const Composant = require('../models/ComposantModel')

//selecter tous les composants
router.route('/').get((req,res) =>{
    Composant.find()
    .then(Composant => res.json(Composant))
    .catch(err => res.status(400).json('erro' +err))
    })

//ajouter  un Composant
router.route('/ajouter').post((req, res) => {
    const categorie = req.body.categorie;   
    const libelle = req.body.libelle;  
    const prixHT = Number(req.body.prixHT);  
    const prixTTC   = Number(req.body.prixTTC);   
    const gerant= "5ed0ec85c37bf9406433e50d";  


    const ComposantModel = new Composant({
        libelle,
        categorie,
        prixHT,
        prixTTC,
        gerant,
        
    });
    ComposantModel.save()
  .then(() => res.json("Composant added!"))
  .catch(err => res.status(400).json('Error: ' + err));
});
//recherche a une Composant avec id "get http://localhost:3001/Composant/:id"
router.route('/:id').post((req, res) => {
    Composant.findById(req.params.id)
      .then(Composant => res.json(Composant))
      .catch(err => res.status(400).json('Error: ' + err));
});

//suppremer une Composant avec id "delete http://localhost:3001/Composant/:id"
router.route('/:id').delete((req, res) => {
    Composant.findByIdAndDelete(req.params.id)
      .then(() => res.json('Composant deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//modifier une Composant avec id "post http://localhost:3001/Composant/update/:id"
router.route('/update/:id').post((req, res) => {
    Composant.findById(req.params.id)
      .then(composant => {
        composant.categorie = req.body.categorie;
        composant.libelle = req.body.libelle;
        composant.prixHT = Number(req.body.prixHT);
        composant.prixTTC = Number(req.body.prixTTC);
  
        composant.save()
          .then(() => res.json('Composant updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router    
