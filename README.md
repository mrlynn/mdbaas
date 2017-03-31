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


End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Michael Lynn** - *Initial work* - [MongoDB](https://mongodb.com/)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

