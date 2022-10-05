const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const Gerant = require("../models/GerantModel");
// @route POST api/users/register
// @desc Register user
// @access Public
//select tous les Gerants "get http://localhost:3001/Gerant/"
router.route('/').get((req, res) => {
  Gerant.find()
    .then(Gerant => res.json(Gerant))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Gerant.findOne({ email: req.body.email }).then(gerant => {
    if (gerant) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newGerant = new Gerant({
      nom : req.body.nom,
      prenom : req.body.prenom,
      tel : Number(req.body.tel),
      email : req.body.email,
      password : req.body.password,
      nomentreprise : req.body.nomentreprise,
      activite: req.body.activite,
     
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newGerant.password, salt, (err, hash) => {
          if (err) throw err;
          newGerant.password = hash;
          newGerant
            .save()
            .then(() => res.json("Gerant added!"))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find user by email
  Gerant.findOne({ email : req.body.email }).then(gerant => {
    // Check if user exists
    if (!gerant) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(req.body.password, gerant.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: gerant.id,
          nom: gerant.nom,
          prenom: gerant.prenom,
            email: gerant.email,
            tel:gerant.tel,
            nomentreprise :gerant.nomentreprise,
            activite : gerant.activite,
           
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              user: {
                _id: gerant._id ,
                nom: gerant.nom,
              prenom: gerant.prenom,
              email: gerant.email,
              tel:gerant.tel,
              nomentreprise :gerant.nomentreprise,
              activite : gerant.activite,
          
              },
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
module.exports = router;