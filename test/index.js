var Sdk = require('../')
var c = {
	wcfCredential: {
		CompanyNumber: '',
		LoginName: '',
		Password: '',
		WSAccessCode: ''
	}
}

var Sdk = new Sdk(c);

Sdk.GetTitles({}, function(err, data) {
	console.log(err, data)
})