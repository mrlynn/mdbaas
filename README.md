![MDBAAS - MongoDB as a Service](https://github.com/mrlynn/mdbaas/blob/master/mdbaas/public/images/slider-image1.png)

# MongoDB as a Service (MDBAAS)

This repo was created as a demonstration for a talk given at MongoDB World 2017 by Michael Lynn

## Getting Started

If you want to create your own MongoDB as a Service, you may use this project as a starting point.  You will need the following in order to proceed:

### Prerequisites

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

TBD

## Built With

TBD

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Michael Lynn** - *Initial work* - [MongoDB](https://mongodb.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
