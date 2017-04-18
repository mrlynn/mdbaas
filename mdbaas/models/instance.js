


var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var Schema = mongoose.Schema;
var schema = new Schema({
	  "Owner": String,
		"InstanceId": String,
		"ImageId": String,
		"State": Object,
		"PrivateDnsName": String,
		"PublicDnsName": String,
		"StateTransitionReason": String,
		"AmiLaunchIndex": Number,
		"ProductCodes":[],
		"InstanceType": String,
		"LaunchTime": { type: Date, default: Date.now },
		"Placement": {
			"AvailabilityZone": String,
			"GroupName": String,
			"Tenancy": String
		},
		"Monitoring": {
			"State": String
		},
		"SubnetId": String,
		"VpcId": String,
		"PrivateIpAddress": String,
		"StateReason": {
			"Code": String,
			"Message": String
		},
		"Architecture": String,
		"RootDeviceType": String,
		"RootDeviceName": String,
		"BlockDeviceMappings": [],
		"VirtualizationType": String,
		"ClientToken": String,
		"Tags": [],
		"SecurityGroups": [{
			"GroupName": String,
			"GroupId": String
		}],
		"SourceDestCheck": Boolean,
		"Hypervisor": String,
		"NetworkInterfaces": [{

		}],
		"EbsOptimized": Boolean
});

schema.index({
	InstanceId: 'text',
	PrivateDnsName: 'text',
	PublicDnsName: 'text'
});

module.exports = mongoose.model('Instance', schema);
// Getter
// schema.path('price').get(function(num) {
//   return (num / 100).toFixed(2);
// });

// // Setter
// schema.path('price').set(function(num) {
//   return num * 100;
// });
