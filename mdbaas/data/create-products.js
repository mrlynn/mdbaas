var Product = require('../models/product');
var mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');
const async = require('async');
dotenv.load({
	path: '.env'
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
	console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
	logger.log('error', '%s MongoDB connection error. Please make sure MongoDB is running.');
	process.exit();
});

products = [
  new Product({
  	imagePath: '/images/mdbaas-small.png',
    name: 'Small Instance',
		ami: 'ami-6869aa05',
    title: 'Single, Small Instance of MongoDB',
    category: 'MongoDB',
		instanceType: 't2.small',
		instanceCount: 1,
  	slug: 'mdbaas-small',
  	description: 'Smallest instance of MongoDB.  Suitable for development environments or playgrounds.',
    deploymentNotes: 'Ensure that you are not using this configuration in production.  This is a single instance of MongoDB running on a very small, single virtual server.',
    // Price we charge customers
  	price: 12,
    // Cost we pay for the product
  	cost: 9
  }),
  new Product({
  	imagePath: '/images/mdbaas-medium.png',
    name: 'Medium Instance',
    title: 'Single, Medium Sized Instance of MongoDB',
    category: 'MongoDB',
		ami: 'ami-6869aa05',
	  instanceType: 't2.small',
		instanceCount: 1,
  	slug: 'mdbaas-medium',
  	description: 'Medium instance of MongoDB.  Suitable for moderate development environments or small production deployments.',
    deploymentNotes: 'Ensure that you are not using this configuration in production.  This is a single instance of MongoDB running on a moderately sized, single virtual server.',
    // Price we charge customers
  	price: 20,
    // Cost we pay for the product
  	cost: 15
  }),
  new Product({
  	imagePath: '/images/mdbaas-large.png',
    title: 'Single, Large Sized Instance of MongoDB in a Replica Set',
    name: 'Large Instance',
    category: 'MongoDB',
		ami: 'ami-6869aa05',
  	slug: 'mdbaas-large',
		instanceCount: 1,
		instanceType: 't2.small',
  	description: 'Large instance of MongoDB.  This is deployed as a replica set instance -  suitable for medium scale production but also can be useful for large development projects.',
    deploymentNotes: 'This may be used in production with architecture group approval.  This is a replica set instance of MongoDB running on a large memory, cluster of 3 virtual servers.  This will run in a Primary, Secondary, Secondary configuration.',
    // Price we charge customers
  	price: 25,
    // Cost we pay for the product
  	cost: 20
  }),
  new Product({
  	imagePath: '/images/mdbaas-extra-lg.png',
    title: 'Single, Extra-Large Sized, Sharded Instance of MongoDB',
    name: 'Extra Large Instance',
		ami: 'ami-6869aa05',
		instanceCount: 3,
		instanceType: 't2.small',
    category: 'MongoDB',
  	slug: 'mdbaas-extra-lg',
  	description: 'Extra large sharded instance of MongoDB.  Suitable for moderate production deployments.',
    deploymentNotes: 'This may be used in production with architecture group approval.  This is a replica set instance of MongoDB running on a large memory, sharded cluster of 6 virtual servers.  Each replica set (2) will run in a Primary, Secondary, Secondary configuration.',
    // Price we charge customers
  	price: 40,
    // Cost we pay for the product
  	cost: 30
  }),
  new Product({
  	imagePath: '/images/mdbaas-opsmanager.png',
    title: 'Single Ops Manager Application Server Deployment',
    name: 'MongoDB Ops Manager',
		ami: 'ami-6869aa05',
		instanceType: 'm3.xlarge',
		instanceCount: 1,
    category: 'MongoDB',
  	slug: 'mdbaas-opsmanager',
  	description: 'MongoDB Ops Manager Application Server Deployed on an appropriately sized server.',
    deploymentNotes: 'Ops Manager is simply the best way to run, manager, backup and monitor your MongoDB Instances.',
    // Price we charge customers
  	price: 50,
    // Cost we pay for the product
  	cost: 40
  })
];
var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save( function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
	mongoose.disconnect();
}
