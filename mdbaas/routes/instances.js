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
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET instances . */
router.get('/instances', function(req, res, next) {
  AWS.config.update({region: 'us-east-1'});

  var ec2 = new AWS.EC2();

  var params = {
    DryRun: false,
    Filters: [{
      Name: 'instance-state-name',
      Values: ['running']
    },{
      Name: 'tag:Name',
      Values: ['mlynn-nodejs','mlynn-mdbaas']
    }]
  };
  ec2.describeInstances(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data);           // successful response
    }
    res.json(data);

  });
});

router.put('/create-instance/:productSlug', function(req, res, next) {
  Product.findOne({slug:req.params.productslug},function(err,product) {

  })
  AWS.config.update({region: 'us-east-1'});
  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');
  // Create EC2 service object
  var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

  var params = {
     ImageId: 'ami-10fd7020', // amzn-ami-2011.09.1.x86_64-ebs
     InstanceType: 't1.micro',
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
          Value: req.user.email
        },
        {
          Key: 'mdbaas-expcode'
          Value: req.user.expenseCode
        }
     ]};
     ec2.createTags(params, function(err) {
        console.log("Tagging instance", err ? "failure" : "success");
     });
  });
})


module.exports = router;
