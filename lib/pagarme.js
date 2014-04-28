/**
 * PagarMe main namespace
 *
 * @type {object} 
 */
var PagarMe = {

    /**
     * The API key
     *
     * @type {String}
     */
    apiKey: null,

    /**
     * The API endpoint
     *
     * @const
     * @type {string}
     */
    endpoint: 'https://api.pagar.me',

    /**
     * The API version
     *
     * @const
     * @type {number}
     */
    apiVersion: 1,

    /**
     * PagarMe Transaction
     *
     * @type {object}
     */
    Transaction: require('./transaction'),

    /**
     * PagarMe Request
     *
     * @type {object}
     */
    Request: require('./request'),

    /**
     * Get's the full API URL
     *
     * @param {String} path
     * @return {string}
     */
    getFullApiUrl: function(path) {
        return [this.endpoint, '/', this.apiVersion, path].join('');
    }

};


// exports the PagarMe object
module.exports = PagarMe;
