const express = require('express')
const router = express.Router()
const Tresorerie = require('../models/TresorerieModel')

//selecter tous les composants
router.route('/').post((req,res) =>{
    Tresorerie.find()
    .then(Tresorerie => res.json(Tresorerie))
    .catch(err => res.status(400).json('erro' +err))
    })
