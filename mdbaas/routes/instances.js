var express = require('express');
var router = express.Router();
var Ansible = require('node-ansible');

// import entire SDK
// var AWS = require('aws-sdk');
// import AWS object without services
var AWS = require('aws-sdk/global');
// import individual service
var S3 = require('aws-sdk/clients/s3');

var Product = require('../models/product');
var User = require('../models/user');
var Instance = require('../models/instance');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var chalk = require('chalk');
// var csrf = require('csurf');

// var csrfProtection = csrf();
// router.use(csrfProtection);

router.get('/playbook', isLoggedIn, function(req, res, next) {
	var playbook = new Ansible.Playbook().playbook('playbooks/playbook-updates');
	playbook.privateKey('/home/mlynn/.ssh/michael.lynn.pem')
	playbook.inventory('/etc/ansible/hosts')
	playbook.verbose('vvvv');
	playbook.limit('tag_Name_mlynn-mdbaas') // pick up here... mlynn
	playbook.exec();
	var promise = playbook.exec();
	promise.then(function(successResult) {
		console.log(successResult.code); // Exit code of the executed command
		console.log(successResult.output) // Standard output/error of the executed command
	}, function(error) {
		console.error(error);
	})
})
/* GET instances . */
router.get('/', isLoggedIn, function(req, res, next) {
	/* GET instances . */
	AWS.config.update({
		region: 'us-east-1'
	});
	// re-read because a new instance may have been launched
  User.findOne({_id: req.user._id}, function(err,user_doc) {
		var instances = [];
		for (var i = 0, ilen = user_doc.instances.length; i < ilen; i++) {
			var idx = instances.push(user_doc.instances.instanceId);
			console.log("IDX: " + idx);
		}



	var ec2 = new AWS.EC2({
		apiVersion: '2016-11-15'
	});
	console.log("Instance Len:" + instances.length)
	var params = {
		InstanceIds: instances,
		DryRun: false,
		Filters: [{
			Name: 'instance-state-name',
			Values: ['running']
		}, {
			Name: 'tag:owner',
			Values: ['michael.lynn']
		}]
	};
	console.log("Params: " + JSON.stringify(params))

	if (instances.length>0) {

		ec2.describeInstances(params, function(err, data) {
			if (err) {
				console.log(err, err.stack); // an error occurred
			} else {
				console.log(data); // successful response
			}
			console.log(JSON.stringify(data))
			var instances = [];
			var projects = [];
			for (var i = 0, ilen = data.Reservations.length; i < ilen; i++) {
				console.log("I: " + i);
				console.log("Reservation: " + data.Reservations[i].ReservationId);
				for (var j = 0, jlen = data.Reservations[i].Instances.length; j < jlen; j++) {
					// console.log("Instance: " + data.Reservations[i].Instances[j].InstanceId);
					// console.log(JSON.stringify(data.Reservations[i].Instances[j]));
					live_instance = data.Reservations[i].Instances[j]

					if (err) {
						console.log("Error: " + err.message);
						return err;
					}
					console.log("Instance saved");
					var idx = instances.push(data.Reservations[i].Instances[j])-1
					console.log("Instance " + idx + " " + JSON.stringify(data.Reservations[i].Instances[j]));

					for (var k = 0, klen = data.Reservations[i].Instances[j].Tags.length; k < klen; k++) {
						var Key = data.Reservations[i].Instances[j].Tags[k].Key;
						var Value = data.Reservations[i].Instances[j].Tags[k].Value;
						console.log("Key: " + Key);
						console.log("Value: " + Value);
						console.log(JSON.stringify(instances[idx]));
						if (Key == 'project') {
							instances[idx].project = Value;
						}
						if (Key == 'owner') {
							console.log("Instance " + idx + " " + JSON.stringify(instances[idx]));
							instances[idx].owner = Value;
						}
						if (Key == 'Name') {
							instances[idx].name = Value;
						}
						if (Key == 'expire-on') {
							instances[idx].expires = Value;
						}
						// console.log("\t" + Key + ": " + Value);
					}

					if (!instances[idx].project) {
						instances[idx].project == 'Unknown';
					}
					project = instances[idx].project;
					idx = projects.indexOf(project);
					if (idx == -1) {
						projects.push(project);
						idx = projects.indexOf(project);
						projects[idx] = instances[i];
					} else {
						projects[idx] = instances[i];
					}
				}

			}

		res.render('instances', {
			instances: instances,
			errorMsg: "",
			noErrorMsg: true,
			successMsg: "",
			noMessage: true,
			isLoggedIn: req.isAuthenticated()
		});
	});
} else {
	res.render('instances', {
		instances: instances,
		errorMsg: "No instances available",
		noErrorMsg: false,
		successMsg: "",
		noMessage: true,
		isLoggedIn: req.isAuthenticated()
	});
}

	});
});

router.get('/stop/:instanceId', isLoggedIn, function(req, res, next) {
	var instanceId = req.params.instanceId;
	var params = {
	  InstanceIds: [instanceId],
	  DryRun: true
	};

  // call EC2 to start the selected instances
  ec2.startInstances(params, function(err, data) {
    if (err && err.code === 'DryRunOperation') {
      params.DryRun = false;
      ec2.stopInstances(params, function(err, data) {
          if (err) {
            console.log("Error", err);
          } else if (data) {
            console.log("Success", data.StartingInstances);
          }
      });
    } else {
      console.log("You don't have permission to start instances.");
			req.flash(error, "You don't have permission to stop instances");
			res.redirect('/');
    }
  });
});

router.post('/launch', isLoggedIn, function(req, res, next) {
	productId = req.body.productId;
	AWS.config.update({
		region: 'us-east-1'
	});

	memory = req.body.memory;
	project = req.body.project;

	User.findOne({
		_id: req.user._id
	}, function(err, user_doc) {
		Product.findOne({
			slug: req.body.productslug
		}, function(err, product) {
			if (err) {
				req.flash('error', 'Problem finding product');
				res.redirect('/');
			}
			console.log(JSON.stringify(product));
			// Load the AWS SDK for Node.js
			// Create EC2 service object
			var ec2 = new AWS.EC2({
				apiVersion: '2016-11-15'
			});

			var params = {
				// ImageId: 'ami-6869aa05', // amzn-ami-2011.09.1.x86_64-ebs
				ImageId: product.ami, // amzn-ami-2011.09.1.x86_64-ebs
				InstanceType: product.instanceType,
				MinCount: product.instanceCount,
				MaxCount: product.instanceCount,
				KeyName: req.user.keyName,
				SecurityGroupIds: ['mlynn-default']
			};

			// Create the instance
			ec2.runInstances(params, function(err, data) {
				if (err) {
					console.log("Could not create instance", err);
					return;
				}
				var instanceId = data.Instances[0].InstanceId;
				console.log(JSON.stringify(data.Instances[0]));
				console.log("Created instance", instanceId);
				console.log("REQ.USER: " + req.user);
				User.findByIdAndUpdate(
					req.user._id, {
						$push: {
							"instances": {
								instanceId: instanceId
							}
						}
					}, {
						safe: true,
						upsert: true
					},
					function(err, model) {
						console.log(err);
					}
				);
				instance = new Instance(data.Instances[0]);
				instance.save(function(err, result) {
					if (err) {
						console.log("Error: " + err.message);
						return err;
					}
					console.log("Instance saved");
				});
				// Add tags to the instance
				params = {
					Resources: [instanceId],
					Tags: [{
							Key: 'Name',
							Value: 'mlynn-mdbaas' + '-' + req.body.project
						},
						{
							Key: 'project',
							Value: 'mlynn-mdbaas'
						},
						{
							Key: 'owner',
							Value: 'michael.lynn'
						},
						{
							Key: 'expire-on',
							Value: '2017-08-01'
						},
						{
							Key: 'mdbaas-expcode',
							Value: req.user.expenseCode
						}
					]
				};
				ec2.createTags(params, function(err) {
					console.log("Tagging instance", err ? "failure" : "success");
					if (err) {
						req.flash('error', 'Problem finding product');
						res.redirect('/');
					}
					res.redirect('/instance');
				});
			});
		});
	}); // User Find
})

module.exports = router;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

function notLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}
