const express = require('express');
const router = express.Router();
let Fournisseur = require('../models/FournisseurModel');

//select tous les fournisseurs "get http://localhost:3001/Fournisseur/"
router.route('/').get((req, res) => {
    Fournisseur.find()
      .then(Fournisseur => res.json(Fournisseur))
      .catch(err => res.status(400).json('Error: ' + err));
});

// recherche d'un fournisseur par nom de fournisseur
router.route('/nom/:nom')
    .get(function(request, response) {
            var nom = request.params.nom;       
            Fournisseur.findOne({nom:nom},  function(err, fournisseur) {
              if (err) {
                response.json(err);
              }
      
              response.json(fournisseur);
            });
         });
//ajouter un fournisseur "post http://localhost:3001/Fournisseur/ajouter"
router.route('/ajouter').post((req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;  
    const tel = Number(req.body.tel);
    const email = req.body.email;
    const gerant= "5ed0ec85c37bf9406433e50d";


    const fournisseurModel = new Fournisseur({
        nom,
        prenom,
        tel,
        email,
        gerant
    });
    fournisseurModel.save()
  .then(() => res.json("Fournisseur added!"))
  .catch(err => res.status(400).json('Error: ' + err));


});

//calculer le nombre de fournisseur
router.route('/countfournisseur').get(function(req,res){

  Fournisseur.count( {}, function(err, result){

      if(err){
          res.send(err)
      }
      else{
          res.json(result)
      }

 })


})

//recherche a un fournisseur avec id "get http://localhost:3001/Fournisseur/:id"
router.route('/:id').get((req, res) => {
    Fournisseur.findById(req.params.id)
      .then(fournisseur => res.json(fournisseur))
      .catch(err => res.status(400).json('Error: ' + err));
});

//suppremer un fournisseur avec id "delete http://localhost:3001/Fournisseur/:id"
router.route('/:id').delete((req, res) => {
    Fournisseur.findByIdAndDelete(req.params.id)
      .then(() => res.json('Fournisseur deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//modifier un fournisseur avec id "post http://localhost:3001/Fournisseur/update/:id"
router.route('/update/:id').post((req, res) => {
    Fournisseur.findById(req.params.id)
      .then(fournisseur => {
        fournisseur.nom = req.body.nom;
        fournisseur.prenom = req.body.prenom;
        fournisseur.email = req.body.email;
        fournisseur.tel = Number(req.body.tel);
        fournisseur.nomentreprise = req.body.nomentreprise;
  
        fournisseur.save()
          .then(() => res.json('Fournisseur updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

module.exports = router;