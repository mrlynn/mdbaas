var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var chalk = require('chalk');
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    active: {
      home: true
    }
  });
});
/* GET catalog page. */
router.get('/catalog', function(req, res, next) {
  var messages = req.flash('error');
  Product.find(function(err,docs) {
    var productChunks = [];
    var chunkSize = 4;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i,i + chunkSize));
    }
    res.render('catalog/', {
      title: 'MDBaaS',
      active: {
        catalog: true
      },
      products: productChunks,
      messages: messages,
      hasErrors: messages
    });
  });

});
/* Get Product Page */
router.get('/product/:slug', function(req, res, next) {
  Product.findOne({slug: req.params.slug}, function (err,doc) {
    if (err || !doc) {
      req.flash('error', 'Cannot locate product');
      return res.redirect('/catalog');
    }
    res.render('catalog/product', {
      title: doc.title,
      product: doc
    })
  })
})


module.exports = router;
