/**
 * Main namespace
 *
 * @type {object}
 */
var PagarMe = require('./pagarme');


/**
 * Object merger
 *
 * @type {function}
 */
var merge = require('merge');


/**
 * URL to perform requests
 *
 * @const
 * @type {String}
 */
var URL = '/transactions';

/**
 * PagarMe Transaction object
 *
 * @param {object} params 
 */
var PagarMeTransaction = function(params) {
    console.log(PagarMe);

    var defaults = {
        cardNumber: null,
        cardHolderName: null,
        cardExpirationMonth: null,
        cardExpirationYear: null,
        cardCvv: null,
        amount: 0,
        installments: 1,
        status: 'local',
    };

    params = merge(defaults, params);

    this.cardNumber = params.cardNumber;
    this.cardHolderName = params.cardHolderName;
    this.cardExpirationMonth = params.cardExpirationMonth;
    this.cardExpirationYear = params.cardExpirationYear;
    this.cardCvv = params.cardCvv;
    this.amount = params.amount;
    this.installments = params.installments;
    this.status = params.status;

    /**
     * Charge the transaction
     */
    this.charge = function() {
        this.status ='paid';

        var request = new PagarMe.Request(URL, 'POST');

        console.log(request);
    };
};


// export the transaction object
module.exports = PagarMeTransaction;
