![MDBAAS - MongoDB as a Service](https://github.com/mrlynn/mdbaas/blob/master/mdbaas/public/images/slider-image1.png)

# MongoDB as a Service (MDBAAS)

This repo was created as a demonstration for a talk (to be) given at MongoDB World 2017 by Michael Lynn

## What is MongoDB as a Service?

Let's break the term down...

### MongoDB

We know that __MongoDB__ is a database software platform based on __NoSQL__.

### as a Service

This phrase means that whatever words precede will be vended in a an on-demand manner.  There are several characteristics (requirements) of an "as a service" offering.

__On-demand__

To be an as-a-service offering, the product or service should be available to customers immediately (or close) to their demand for said product or service.

This can represent a major challenge when talking about databases.  In order to be able to provide on-demand service, you may have to pre-provision hardware, or develop some mechanism to enable you to deploy hardware and operating systems in an extremely rapid fashion.

__Broad Access__

TBD

__Resource Pooling__

TBD

__Rapid Elasticity__

TBD

__Measured Service__

TBD


## Why?

There are countless ways to implement Database as a Service.  What's contained in this repository represents one approach... maybe not even the most efficient, or effective method.  In fact, as an employee of __MongoDB__, I feel compelled to mention the fact that this problem has been solved... not only solved - but solved in an extremely effective, and efficient manner.  You can use this service to satisfy your own __MongoDB as a Service__ offering.  This may not give you the flexibility or control you require to vend this service to your internal users.  THAT is precisely why this talk, and this repository exist.

## Getting Started

If you want to create your own MongoDB as a Service, you may use this project as a starting point.  You will need the following in order to proceed:

### Prerequisites

If you intend to start building your own MongoDB as a Service offering to your internal customers, it will be necessary for you to have the following components in place.

* Knowledge of the MEAN Stack

This project was written using NodeJS, ExpressJS and MongoDB.

* An AWS Account

Because I can't know what type of hardware you have available, I chose to create this demo system leveraging AWS, more specifically, EC2 instances.


### Installing

A step by step series of examples that tell you have to get a development env running

```sh
$ git clone git://github.com/mrlynn/mdbaas.git
$ npm install
$ cp .env.example .env
$ mkdir ~/.aws
$ echo "[default]" > ~/.aws/credentials
$ echo "aws_access_key_id = OKIART2LTDTXUQPOLGGZNJQ" >> ~/.aws/credentials
$ echo "aws_secret_access_key = +1z4Mg99h93ryYcejkerk5iix4BLika++7KjFoVZ" >> ~/.aws/credentials
$ echo npm start
```

Then visit [http://localhost:3000/](http://localhost:3000/)

## Creating service catalog products

The system is designed to show how you may build an internal MongoDB as a service offering in your company.  I've created a sample set of MongoDB services based on t-shirt sizes.  In order to create these examples, you should have MongoDB running on the same system where you installed the code from this repo.

Next, change to the project directory (at the same level as app.js) and type:

```sh
$ node data/create-products.js
```

The cursor should just return after a second or two.  This nodeJS script will create the following products for your demo catalog:

| Product    | Description                     |
|------------|---------------------------------|
| Small      | Small MongoDB Instance          |
| Medium     | Medium MongoDB Instance         |
| Large      | Large MongoDB Instance          |
| Extra Lg   | Extra Lg MongoDB Instance       |
| OpsManager | Ops Manager Instance            |


## Deployment

* TBD

## Built With

* TBD

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Michael Lynn** - *Initial work* - [MongoDB](https://mongodb.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* TBD