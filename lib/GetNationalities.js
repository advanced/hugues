var Wsdl = require('./Wsdl');

module.exports = function(config) {
  
  var input = {}
  var soap = new Wsdl('GetNationalities',input,config); 

  return function GetNationalities(data,callback) {
  		soap.call({},function(err,data){
	  		callback(err,data)
  		})
  }


};

