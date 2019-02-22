const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');
const request = require("request");
const requestPr = require("request-promise");


const vehicleowner_api = require('../config/vehicleowner');

// Load VehicleOwner Model
require('../models/VehicleOwner');
const VehicleOwner = mongoose.model('vehicleowners');


// VehicleOwner Index Page
router.get('/',  (req, res) => {

  var options = {
    uri: customer_api.customerHostPort,
    method: 'POST',
    json: {
      customer: 'Your todo111'
    }
  };
  
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print the shortened url.
    }
  });




       
  VehicleOwner.find({user: req.user.id})
    .sort({date:'desc'})
    .then(vehicleowners => {
      res.render('vehicleowners/index', {
        vehicleowners:vehicleowners
      });
    });
});

// Add VehicleOwner Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('vehicleowners/add');
});

// Edit VehicleOwner Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  VehicleOwner.findOne({
    _id: req.params.id
  })
  .then(vehicleowner => {
    if(vehicleowner.user != req.user.id){
      req.flash('error_msg', 'Not Authorized');
      res.redirect('/vehicleowners');
    } else {
      res.render('vehicleowners/edit', {
        vehicleowner:vehicleowner
      });
    }
    
  });
});

// Process Form
router.post('/', ensureAuthenticated, (req, res) => {

  request.post(customer_api.customerHostPort
  ,(err,res)=>{
      if(err!=null)
      {
          // console.log(1)
          // console.log(err);
      }
      else
      {
          // console.log(res);
      }
  });


  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     customer_api.customerHostPort,
    body:    '{customer: "Your todo"}'
  }, function(error, response, body){
    console.log(body);
  });

  customer_api+"/api/customers"
  let errors = [];

  if(!req.body.title){
    errors.push({text:'Please add a title'});
  }
  if(!req.body.details){
    errors.push({text:'Please add some details'});
  }

  if(errors.length > 0){
    res.render('/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
      user: req.user.id
    }
    new VehicleOwner(newUser)
      .save()
      .then(vehicleowner => {
        req.flash('success_msg', 'Video vehicleowner added');
        res.redirect('/vehicleowners');
      })
  }
});

// Edit Form process
router.put('/:id', ensureAuthenticated, (req, res) => {
  VehicleOwner.findOne({
    _id: req.params.id
  })
  .then(vehicleowner => {
    // new values
    vehicleowner.title = req.body.title;
    vehicleowner.details = req.body.details;

    vehicleowner.save()
      .then(vehicleowner => {
        req.flash('success_msg', 'Video vehicleowner updated');
        res.redirect('/vehicleowners');
      })
  });
});

// Delete VehicleOwner
router.delete('/:id', ensureAuthenticated, (req, res) => {
  VehicleOwner.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Video vehicleowner removed');
      res.redirect('/vehicleowners');
    });
});

module.exports = router;