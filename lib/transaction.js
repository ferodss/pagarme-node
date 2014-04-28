

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
        id: null,
        refuse_reason: null,
        date_created: null,
        payment_method: 'credit_card',
        card_number: null,
        card_holder_name: null,
        card_expiration_month: null,
        card_expiration_year: null,
        card_cvv: null,
        amount: 0,
        installments: 1,
        status: 'local',
    };

    // Merge default params
    params = merge(defaults, params);

    this.id = params.id;
    this.refuse_reason = params.refuse_reason;
    this.date_created = params.date_created;
    this.payment_method = params.payment_method;
    this.card_number = params.card_number;
    this.card_holder_name = params.card_holder_name;
    this.card_expiration_month = params.card_expiration_month;
    this.card_expiration_year = params.card_expiration_year;
    this.card_cvv = params.card_cvv;
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
            'card_number': this.card_number,
            'card_holder_name': this.card_holder_name,
            'card_expiration_date': [this.card_expiration_month, this.card_expiration_year].join(''),
            'card_cvv': this.card_cvv,
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
            'installments': this.installments
        });

        var self = this;
        request.run(params, function(res) {
            self.id = res.id;
            self.status = res.status;
            self.refuse_reason = res.refuse_reason;
            self.date_created = new Date(res.date_created);

            if (typeof callback == 'function') {
                callback();
            }
        });

    };

    /**
     * List transactions
     *
     * @param {Function} callback A callback to execute with transactions list
     * @param {number} page Page number, default 1
     * @param {count} count Transactions count, default 10
     */
    this.all = function(callback, page, count) {
        page  = page || 1;
        count = count || 10;

        var request = new PagarMe.Request(URL, 'GET');
        request.run({}, function(res) {
            var transactions = [];
            res.forEach(function(transaction) {
                transactions.push(new PagarMe.Transaction(transaction));
            });

            callback(transactions);
        });
    };

    /**
     * Refund the transaction
     *
     * @param {Function} callback
     * @throws Error 
     */
    this.refund = function(callback) {
        if (this.status == 'refunded') {
            throw new Error('Transaction already refunded!');
        }

        if (this.status != 'paid') {
            throw new Error('Transaction needs to be paid to be refunded');
        }

        if (this.payment_method != 'credit_card') {
            throw new Error("Boletos can't be refunded");
        }

        var url = [URL, '/', this.id, '/' ,'refund'].join('');
        var request = new PagarMe.Request(url, 'POST');

        var self = this;
        request.run({}, function(res) {
            self.status = res.status;

            callback();
        });
    };

};


// export the transaction object
module.exports = PagarMeTransaction;
