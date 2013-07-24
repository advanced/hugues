var request = require('request');
var j2x = require('jsontoxml');
var x2j = require('xml2json');
var _ = require('lodash');

module.exports = Wsdl

function Wsdl(SOAPAction,input,options) {

	this.options = options || {};
	this.SOAPAction = SOAPAction || ''; 
	this.input = input || {}; 
	this.input.wcfCredential = options.wcfCredential	

}

Wsdl.prototype.addNS = function addNS(obj) {

	_.map(obj, function(value, key, list) {
		if (_.isObject(value)) {
			list['ns1:' + key] = value;
			delete list[key];
			return addNS(value)
		} else {
			list['ns1:' + key] = value;
			return delete list[key];
		}
	});
	return obj
}

Wsdl.prototype.generateXmlHeader = function generatexmlHeader() {
	var xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
	xmlHeader += '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.hughes.com.hk/bkgsys">'
	xmlHeader += '<SOAP-ENV:Body>';
	return xmlHeader;
}


Wsdl.prototype.generateXmlBody = function generateXmlBody() {
	var action = {}
	var self = this ;

	action[self.SOAPAction] = self.input
	return j2x(self.addNS(action));
}

Wsdl.prototype.generateXmlFooter = function generateXmlFooter() {
	var xmlFooter = '</SOAP-ENV:Body>';
	xmlFooter += '</SOAP-ENV:Envelope>';
	return xmlFooter;
}



Wsdl.prototype.generateXmlPayLoad = function generateXmlPayLoad() {

	return this.generateXmlHeader() + this.generateXmlBody() + this.generateXmlFooter()
}

Wsdl.prototype.setHeaders = function setHeaders() {
	var self = this ;
	var headers = {
		'User-Agent': 'eastbnb/0.1.2',
		'Accept': 'text/html,application/xhtml+xml,application/xml',
		'Accept-Encoding': 'none',
		'Accept-Charset': 'utf-8',
		'Connection': 'keep-alive',
		'Host': 'www.hughes.com.hk',
		'Content-Type': 'text/xml; charset=utf-8',
		'SOAPAction': '"' + self.options.soapActionPrefix + self.SOAPAction +'"'
	}

	return headers;
}

Wsdl.prototype.call = function(options, cb) {
	var self = this ;
	var params = {
		uri: self.options.url,
		method: 'POST',
		headers: self.setHeaders(),
		body: self.generateXmlPayLoad()
	};
	request(params, function(error, res, body) {
		if (error) {
			cb(error,null);
		} else {
			cb(null,x2j.toJson(body));
		}
	});
}