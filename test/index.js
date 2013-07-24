var Sdk = require('../')
var c = {
	wcfCredential: {
		CompanyNumber: '',
		LoginName: '',
		Password: '',
		WSAccessCode: ''
	}
}

var sdk = new Sdk(c);

sdk.GetTitles({}, function(err, data) {
	console.log(err, data)
})

sdk.GetNationalities({}, function(err, data) {
	console.log(err, data)
})