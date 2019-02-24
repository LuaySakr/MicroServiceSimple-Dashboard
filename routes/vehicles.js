const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');
const request = require("request");
const requestPr = require("request-promise");

const vehicle_api = require('../config/vehicle');
// Load Vehicle Model
require('../models/Vehicle');
const Vehicle = mongoose.model('vehicles');
// Vehicle Index Page
router.get('/', (req, res) => {
 
  var options = {
    uri: vehicle_api.vehicleHostPort,
    method: 'GET'
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
console.log(JSON.parse(body).vehicle)
      res.render('vehicles/index', {
        vehicles: JSON.parse(body).vehicle
      });
    }
  })
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
      if (vehicle.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/vehicles');
      } else {
        res.render('vehicles/edit', {
          vehicle: vehicle
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
    errors.push({ text: 'Please add a VehicleId' });
  }
  if (!req.body.regNum) {
    errors.push({ text: 'Please add some RegNum' });
  }
  if (errors.length > 0) {
    res.render('/add', {
      errors: errors,
      number: req.body.number,
      vehicleId: req.body.vehicleId,
      regNum: req.body.regNum
    });
  }
  else {
    const newUser = {
      number: req.body.number,
      vehicleId: req.body.vehicleId,
      regNum: req.body.regNum
    }
    new Vehicle(newUser)
  }
  var options = {
    uri: vehicle_api.vehicleHostPort,
    method: 'POST',
    json: {
      number: req.body.number,
      vehicleId: req.body.vehicleId,
      regNum: req.body.regNum
    }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    }
  });
  res.redirect('/Vehicles');
});
// Edit Form process
router.put('/:number', ensureAuthenticated, (req, res) => {
  Vehicle.findOne({
    _id: req.params.id
  })
    .then(vehicle => {
      // new values
      vehicle.title = req.body.title;
      vehicle.details = req.body.details;
      vehicle.save()
        .then(vehicle => {
          req.flash('success_msg', ' vehicle updated');
          res.redirect('/vehicles');
        })
    });
});
// Delete Vehicle
router.delete('/:id', ensureAuthenticated, (req, res) => {
 
 
  var options = {
    uri: vehicle_api.vehicleHostPort + "/" + req.params.id,
    method: 'DELETE',
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      vehicle: JSON.parse(body).vehicle
    }
    res.redirect('/vehicles');
  });
 
});
module.exports = router;