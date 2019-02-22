const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');
const request = require("request");
const requestPr = require("request-promise");
const customer_api = require('../config/customer');

const vehicle_api = require('../config/vehicle');

// Load Vehicle Model
require('../models/Vehicle');
const Vehicle = mongoose.model('vehicles');


// Vehicle Index Page
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




       
  Vehicle.find({user: req.user.id})
    .sort({date:'desc'})
    .then(vehicles => {
      res.render('vehicles/index', {
        vehicles:vehicles
      });
    });
});

// Add Vehicle Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('vehicles/add');
});

// Edit Vehicle Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Vehicle.findOne({
    _id: req.params.id
  })
  .then(vehicle => {
    if(vehicle.user != req.user.id){
      req.flash('error_msg', 'Not Authorized');
      res.redirect('/vehicles');
    } else {
      res.render('vehicles/edit', {
        vehicle:vehicle
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
    new Vehicle(newUser)
      .save()
      .then(vehicle => {
        req.flash('success_msg', 'Video vehicle added');
        res.redirect('/vehicles');
      })
  }
});

// Edit Form process
router.put('/:id', ensureAuthenticated, (req, res) => {
  Vehicle.findOne({
    _id: req.params.id
  })
  .then(vehicle => {
    // new values
    vehicle.title = req.body.title;
    vehicle.details = req.body.details;

    vehicle.save()
      .then(vehicle => {
        req.flash('success_msg', 'Video vehicle updated');
        res.redirect('/vehicles');
      })
  });
});

// Delete Vehicle
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Vehicle.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Video vehicle removed');
      res.redirect('/vehicles');
    });
});

module.exports = router;