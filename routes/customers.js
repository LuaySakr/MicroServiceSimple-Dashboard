const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

const {ensureAuthenticated} = require('../helpers/auth');

const request = require("request");

const requestPr = require("request-promise");

const customer_api = require('../config/customer');

// Load Customer Model

require('../models/Customer');

const Customer = mongoose.model('customers');



// Customer Index Page

router.get('/', ensureAuthenticated, (req, res) => {

  // console.log(req.body)

  var options = {

    uri: customer_api.customerHostPort,

    method: 'GET'

   

  };

  

  request(options, function (error, response, body) {

    if (!error && response.statusCode == 200) {

      // console.log(JSON.parse(body))

      res.render('customers/index', {

        customers:JSON.parse(body).customer

      });

 



      // console.log(body) // Print the shortened url.

    }

  })

  // .then();

  // res.render('customers/index', {

  //   customers:customers

  // });



  // console.log("done")

  // res.redirect('/customers');



  // Customer.find({user: req.user.id})

  //   .sort({date:'desc'})

  //   .then(customers => {

  //     res.render('customers/index', {

  //       customers:customers

  //     });

  //   });

});



// Add Customer Form

router.get('/add', ensureAuthenticated, (req, res) => {







  res.render('customers/add');

});



// Edit Customer Form

router.get('/edit/:id', ensureAuthenticated, (req, res) => {



  console.log(req.params)
  var options = {

    uri: customer_api.customerHostPort+"/"+req.params.id,

    method: 'PUT',

    json: {

      number: req.body.number,

      name: req.body.name,

      adrs: req.body.adrs

    }

  };

  

  request(options, function (error, response, body) {

    if (!error && response.statusCode == 200) {

      customer:JSON.parse(body).customer

    }

  });


      //   res.render('customers/edit', {

      //  number:1

      // });
  // Customer.findOne({

  //   _id: req.params.number

  // })

  // .then(customer => {

    // if(customer.user != req.user.id){

    //   req.flash('error_msg', 'Not Authorized');

    //   res.redirect('/customers');

    // } else
    //  {

    //   res.render('customers/edit', {

    //     customer:customer

    //   });

    // }

    

  // });



  // console.log(req.body)

  // var options = {

  //   uri: customer_api.customerHostPort+req.params.id,

  //   method: 'PUT',

  //   json: {

  //     number: req.body.number,

  //     name: req.body.name,

  //     adrs: req.body.adrs

  //   }

  // };

  

  // request(options, function (error, response, body) {

  //   if (!error && response.statusCode == 200) {

  //     console.log(body) // Print the shortened url.

  //   }

  // });



  // console.log("done")

  // res.redirect('/customers');

});



// Process Form

router.post('/', ensureAuthenticated, (req, res) => {

  

  let errors = [];



  if(!req.body.number){

    errors.push({text:'Please add a Number'});

  }

  if(!req.body.name){

    errors.push({text:'Please add a Name'});

  }

  if(!req.body.adrs){

    errors.push({text:'Please add some Address'});

  }



  if(errors.length > 0){

    res.render('/add', {

      errors: errors,

      number: req.body.number,

      name : req.body.name,

      adrs: req.body.adrs

    });

  } 

  else 

  {

    const newUser = {

      number: req.body.number,

      name : req.body.name,

      adrs: req.body.adrs

    }

    new Customer(newUser)

      // .save()

      // .then(customer => {

      //   req.flash('success_msg', 'customer added');

      //   res.redirect('/customers');

      // })

  }



  // console.log(req.body)

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

      // console.log(body) // Print the shortened url.

    }

  });



  // console.log("done")

  res.redirect('/customers');

});



// Edit Form process

router.put('/:number', ensureAuthenticated, (req, res) => {

  // Customer.findOne({

  //   _id: req.params.number

  // })

  // .then(customer => {

  //   // new values


  //   customer.number = req.body.number;

  //   customer.name = req.body.name;

  //   customer.adrs = req.body.adrs;



  //   customer.save()

  //     .then(customer => {

  //       req.flash('success_msg', 'Video customer updated');

  //       res.redirect('/customers');

  //     })

  // });

});



// Delete Customer

router.delete('/:id', ensureAuthenticated, (req, res) => {

  Customer.remove({_id: req.params.id})

    .then(() => {

      req.flash('success_msg', 'Video customer removed');

      res.redirect('/customers');

    });

});



module.exports = router;