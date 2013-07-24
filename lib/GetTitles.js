var Wsdl = require('./Wsdl');

module.exports = function(config) {
  
  var input = {}
  var soap = new Wsdl('GetTitles',input,config); 

  return function GetTitles(data,callback) {
  		soap.call({},function(err,data){
	  		callback(err,data)
  		})
  }


};

