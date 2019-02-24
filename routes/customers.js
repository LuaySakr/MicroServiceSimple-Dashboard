const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');
const request = require("request");
const requestPr = require("request-promise");
const customer_api = require('../config/customer');


// Load Customer Model
require('../models/Customer');
const Customer = mongoose.model('customers');
// Customer Index Page
router.get('/', ensureAuthenticated, (req, res) => {
  var options = {
    uri: customer_api.customerHostPort,
    method: 'GET'
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('customers/index', {
        customers: JSON.parse(body).customer
      });
    }
  })
});
// Add Customer Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('customers/add');
});
// Process Form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];
  if (!req.body.number) {
    errors.push({ text: 'Please add a Number' });
  }
  if (!req.body.name) {
    errors.push({ text: 'Please add a Name' });
  }
  if (!req.body.adrs) {
    errors.push({ text: 'Please add some Address' });
  }
  if (errors.length > 0) {
    res.render('/add', {
      errors: errors,
      number: req.body.number,
      name: req.body.name,
      adrs: req.body.adrs
    });
  }
  else {
    const newUser = {
      number: req.body.number,
      name: req.body.name,
      adrs: req.body.adrs
    }
    new Customer(newUser)
  }
  var options = {
    uri: customer_api.customerHostPort,
    method: 'POST',
    json: {
      number: req.body.number,
      name: req.body.name,
      adrs: req.body.adrs
    }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    }
  });
  res.redirect('/customers');
});
// Edit Form process
router.put('/:number', ensureAuthenticated, (req, res) => {
});
// Delete Customer
router.delete('/:id', ensureAuthenticated, (req, res) => {
 
  var options = {
    uri: customer_api.customerHostPort + "/" + req.params.id,
    method: 'DELETE',
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      customer: JSON.parse(body).customer
    }
    res.redirect('/customers');
  });
});
module.exports = router;