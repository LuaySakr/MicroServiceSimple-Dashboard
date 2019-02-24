const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');
const request = require("request");
const requestPr = require("request-promise");

const vehicleowner_api = require('../config/vehicleowner');
// Load vehicleowner Model
require('../models/VehicleOwner');
const VehicleOwner = mongoose.model('vehicleowners');
// vehicleowner Index Page
router.get('/', (req, res) => {
  var options = {
    uri: vehicleowner_api.vehicleownerHostPort,
    method: 'GET'
  };
 
  // //console.log(options)
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
     
      //console.log(JSON.parse(body).vehicleowner);
      res.render('vehicleowners/index', {
 
        vehicleowners: JSON.parse(body).vehicleowner
      });
    }
    else {
      //console.log(error);
    }
  })
});
// Add vehicleowner Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('vehicleowners/add');
});
// Edit vehicleowner Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  vehicleowner.findOne({
    _id: req.params.id
  })
    .then(vehicleowner => {
      if (vehicleowner.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/vehicleowners');
      } else {
        res.render('vehicleowners/edit', {
          vehicleowner: vehicleowner
        });
      }
    });
});
// Process Form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];
  if (!req.body.number) {
    errors.push({ text: 'Please add a Number' });
  }
  if (!req.body.vehicleId) {
    errors.push({ text: 'Please add a vehicleownerId' });
  }
  if (!req.body.customerNum) {
    errors.push({ text: 'Please add some RegNum' });
  }
  
  if (errors.length > 0) {
   
    res.render('/add', {
      errors: errors,
      number: req.body.number,
      name: req.body.vehicleId,
      adrs: req.body.customerNum
    });
  }
  else {
   
    const newUser = {
      number: req.body.number,
      vehicleId: req.body.vehicleId,
      customerNum: req.body.customerNum
    }
    new VehicleOwner(newUser)
  }
  var options = {
    uri: vehicleowner_api.vehicleownerHostPort,
    method: 'POST',
    json: {
      number: req.body.number,
      vehicleId: req.body.vehicleId,
      customerNum: req.body.customerNum
    }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    }
  });
  res.redirect('/vehicleowners');
});
// Edit Form process
router.put('/:number', ensureAuthenticated, (req, res) => {
  vehicleowner.findOne({
    _id: req.params.number
  })
   
});
// Delete vehicleowner
router.delete('/:id', ensureAuthenticated, (req, res) => {
 
 
  var options = {
    uri: vehicleowner_api.vehicleownerHostPort + "/" + req.params.id,
    method: 'DELETE',
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      vehicleowner: JSON.parse(body).vehicleowner
    }
    res.redirect('/vehicleowners');
  });
 
});
module.exports = router;