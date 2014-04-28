

/**
 * PagarMe Transaction object
 *
 * @param {object} params Object with transaction definition
 * @constructor
 */
var PagarMeTransaction = function(params) {

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


    /**
     * URL to perform requests
     *
     * @const
     * @type {String}
     * @private
     */
    var URL = '/transactions';


    /**
     * Default params
     *
     * @type {Object}
     * @private
     */
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

    // Merge default params
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
     * Build credit card data parameters
     *
     * @return {Object}
     * @private
     */
    this.getCardParameters = function() {
        return {
            'card_number': this.cardNumber,
            'card_holder_name': this.cardHolderName,
            'card_expiration_date': [this.cardExpirationMonth, this.cardExpirationYear].join(''),
            'card_cvv': this.cardCvv,
        };
    };

    /**
     * Charge the transaction
     *
     * @param {Function} callback
     */
    this.charge = function(callback) {
        var request = new PagarMe.Request(URL, 'POST');

        var params = merge(this.getCardParameters(), {
            'amount': this.amount,
            'installments': this.installments,
            'payment_method': 'credit_card'
        });

        var self = this;
        request.run(params, function(res) {
            self.id = res.id;
            self.status = res.status;
            self.refuseReason = res.refuse_reason;
            self.dateCreated = new Date(res.date_created);

            if (typeof callback == 'function') {
                callback();
            }
        });

    };
};


// export the transaction object
module.exports = PagarMeTransaction;
