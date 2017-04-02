var express = require('express');
var router = express.Router();

// import entire SDK
var AWS = require('aws-sdk');
// import AWS object without services
var AWS = require('aws-sdk/global');
// import individual service
var S3 = require('aws-sdk/clients/s3');

var Product = require('../models/product');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var chalk = require('chalk');
// var csrf = require('csurf');
AWS.config.update({region: 'us-east-1'});

  //memory = req.body.memory;
  var memory = '2';
  //console.log("Memory: " + memory + " product id: " + productId);
  //Product.findOne({slug:req.params.productslug},function(err,product) {

  //})
  // Load the AWS SDK for Node.js
  // Create EC2 service object
  var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

  var params = {
     ImageId: 'ami-6869aa05', // amzn-ami-2011.09.1.x86_64-ebs
     InstanceType: 't2.small',
     MinCount: 1,
     MaxCount: 1
  };

  // Create the instance
  ec2.runInstances(params, function(err, data) {
     if (err) {
        console.log("Could not create instance", err);
        return;
     }
     var instanceId = data.Instances[0].InstanceId;
     console.log("Created instance", instanceId);
     // Add tags to the instance
     params = {Resources: [instanceId], Tags: [
        {
           Key: 'Name',
           Value: 'mlynn-mdbaas'
        },
        {
          Key: 'mdbaas-owner',
          //Value: req.user.email
          Value: 'merlynn@gmail.com'
        },
        {
          Key: 'mdbaas-expcode',
          //Value: req.user.expenseCode
          Value: 'exp001'
        }
     ]};
     ec2.createTags(params, function(err) {
        console.log("Tagging instance", err ? "failure" : "success");
     });
  });
