var express = require('express');
var router = express.Router();
var Ansible = require('node-ansible');
// import entire SDK
var AWS = require('aws-sdk');
// import AWS object without services
var AWS = require('aws-sdk/global');
// import individual service
var S3 = require('aws-sdk/clients/s3');
var ini = require('ini');
var fs = require('fs');
var Product = require('../models/product');
var Instance = require('../models/instance');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var chalk = require('chalk');
// var csrf = require('csurf');

// var csrfProtection = csrf();
// router.use(csrfProtection);

/* GET instances . */
	AWS.config.update({
		region: 'us-east-1'
	});

	var ec2 = new AWS.EC2({
		apiVersion: '2016-11-15'
	});

	var params = {
		DryRun: false,
		Filters: [{
			Name: 'instance-state-name',
			Values: ['running']
		},{
		 	Name: 'tag:owner',
		 	Values: ['michael.lynn']
		},
		]
	};
	ec2.describeInstances(params, function(err, data) {
		// if (err) {
		// 	console.log(err, err.stack); // an error occurred
		// } else {
		// 	console.log(data); // successful response
		// }
    // console.log(JSON.stringify(data))
    for (var i = 0, ilen = data.Reservations.length; i < ilen; i++) {
			console.log("I: " + i);
			console.log("Reservation: " + data.Reservations[i].ReservationId);
			for (var j = 0, jlen = data.Reservations[i].Instances.length; j < jlen; j++) {
				console.log("Instance: " + data.Reservations[i].Instances[j].InstanceId);
				console.log(JSON.stringify(data.Reservations[i].Instances[j]));
				 for (var k = 0, klen = data.Reservations[i].Instances[j].Tags.length; k < klen; k++) {
					  var Key = data.Reservations[i].Instances[j].Tags[k].Key;
					  var Value = data.Reservations[i].Instances[j].Tags[k].Value;
						// 	console.log("Project: " + JSON.stringify(data.Reservations[i].Instances[j].Tags[k]));
						console.log("\t" + Key + ": " + Value);
				 }
				 
			}
			console.log("---");
    }


var hosts = ini.parse(fs.readFileSync('./ansible-hosts', 'utf-8'))

hosts.scope = 'local'
config.database.database = 'use_another_database'
config.paths.default.tmpdir = '/tmp'
delete config.paths.default.datadir
config.paths.default.array.push('fourth value')

fs.writeFileSync('./config_modified.ini', ini.stringify(config, { section: 'section' }))
	});

module.exports = router;
