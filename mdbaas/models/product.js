var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var Schema = mongoose.Schema;
var schema = new Schema({
	tags: [{
		type: String,
		_id: false
	}],
	status: {
		type: String
	},
	instanceType: {
		type: String,
		required: false
	},
	instanceCount: {
		type: Number,
		required: false
	},
	imagePath: {
		type: String,
		required: false
	},
	ami: {
		type: String,
		required: false
	},
	name: {
		type: String,
		required: true
	},
	deploymentNotes: {
		type: String,
		required: false
	},
	title: {
		type: String,
		required: true
	},
  category: {
    type: String,
    required: false
  },
	slug: {
		type: String,
		required: false
	},
	description: {
		type: String,
		required: false
	},
  // Price we charge customers
	price: {
    type: Currency,
    required: true
	},
  // Cost we pay for the product
	cost: {
    type: Currency,
    required: false
	},
	Product_Group: {
		type: String,
		required: false
	},
	Attributes: [{
		Name: {
			type: String,
			required: false
		},
		Value: {
			type: String,
			required: false
		},
		_id: false
	}],
	options: [{
		name: {
			type: String,
			required: false
		},
		value: {
			type: String,
			required: false
		}
	}],
	created: {
		type: Date,
		default: Date.now()
	},
	salesYTD: [{
		year: {
			Type: Number
		},
		salesAmount: {
			Type: Number
		},
		salesCount: {
			Type: Number
		}
	}],
	salesYearMonth: [{
		yearMonth: {
			Type: String
		},
		salesAmount: {
			Type: Number
		},
		salesCount: {
			Type: Number
		}
	}]
});

schema.index({name: 'text',title:'text',description:'text',category:'text', code: 'text'});

module.exports = mongoose.model('Product',schema);
// Getter
// schema.path('price').get(function(num) {
//   return (num / 100).toFixed(2);
// });

// // Setter
// schema.path('price').set(function(num) {
//   return num * 100;
// });
