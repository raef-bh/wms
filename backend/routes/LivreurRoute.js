const express = require('express')
const router = express.Router()
const Livreur = require('../models/LivreurModel')



//selecter tous les composants
router.route('/').get((req,res) =>{
    Livreur.find()
    .then(Livreur => res.json(Livreur))
    .catch(err => res.status(400).json('erro' +err))
    })

//ajouter  un Livreur
router.route('/ajouter').post((req, res) => {
    const nom = req.body.nom;   
    const prenom = req.body.prenom;  
    const num_tel = Number(req.body.num_tel);  
    const lng   = Number(req.body.lng); 
    const lat   = Number(req.body.lat);  
    const speed   = Number(req.body.speed);
    const volts   = Number(req.body.volts);
    const vehicule_id = req.body.vehicule_id;
    const gerant= "5ed0ec85c37bf9406433e50d";  


    const ComposantModel = new Livreur({
        prenom,
        nom,
        num_tel,
        lng,
        lat,
        speed,
        volts,
        vehicule_id,
        gerant,
        
    });
    ComposantModel.save()
  .then(() => res.json("Livreur added!"))
  .catch(err => res.status(400).json('Error: ' + err));
});

// recherche d'un livreur par nom 
router.route('/:nom')
    .get(function(request, response) {
            var nom = request.params.nom;       
            Livreur.findOne({nom:nom},  function(err, livreur) {
              if (err) {
                response.json(err);
              }
      
              response.json(livreur);
            });
         });


//recherche a une Livreur avec id "get http://localhost:3001/Livreur/:id"
router.route('/:id').get((req, res) => {
    Livreur.findById(req.params.id)
      .then(Livreur => res.json(Livreur))
      .catch(err => res.status(400).json('Error: ' + err));
});

//suppremer une Livreur avec id "delete http://localhost:3001/Livreur/:id"
router.route('/:id').delete((req, res) => {
    Livreur.findByIdAndDelete(req.params.id)
      .then(() => res.json('Livreur deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//modifier une Livreur avec id "post http://localhost:3001/Livreur/update/:id"
router.route('/update/:id').post((req, res) => {
    Livreur.findById(req.params.id)
      .then(livreur => {
    livreur.nom = req.body.nom;   
    livreur.prenom = req.body.prenom;  
    livreur.num_tel = Number(req.body.num_tel);  
    livreur.lng   = Number(req.body.lng); 
    livreur.lat   = Number(req.body.lat);  
    livreur.speed   = Number(req.body.speed);
    livreur.volts   = Number(req.body.volts);
    livreur.vehicule_id = req.body.vehicule_id;
        livreur.save()
          .then(() => res.json('Livreur updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router    
