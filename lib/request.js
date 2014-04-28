/**
 * PagarMe Request
 *
 * @param {String} path Path partion of the request
 * @param {String} method HTTP method of the request
 * @constructor
 */
var PagarMeRequest = function(path, method) {

    /**
     * Main namespace
     *
     * @type {object}
     * @private
     */
    var PagarMe = require('./pagarme');

    /**
     * Object merger
     *
     * @type {function}
     * @private
     */
    var merge = require('merge');

    var request = require('request');

    /**
     * Path partion of the request
     *
     * @type {string}
     * @private
     */
    this.path = path;

    /**
     * HTTP method of the request
     *
     * @type {String}
     * @private
     */
    this.method = method;

    /**
     * Parameters of the request
     *
     * @type {Object}
     */
    this.parameters = {};
    
    /**
     * Run the request
     *
     * @param {Object} params The request params
     * @param {Function} callback The request callback
     */
    this.run = function(params, callback) {
        this.parameters = merge(params, {'api_key': PagarMe.apiKey});

        request({
            uri: PagarMe.getFullApiUrl(this.path),
            method: this.method,
            form: this.parameters
        }, function (error, response, body) {
            if (! error && response.statusCode == 200) {
                callback(JSON.parse(body));
            }
        });
    };
};

module.exports = PagarMeRequest;
