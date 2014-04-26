'use strict';

describe('PagarMe::Transsaction', function() {

    var PagarMe
    , params = {};

    beforeEach(function() {
        PagarMe = require('../lib/pagarme');
        params = {
            cardNumber: '4901720080344448',
            cardHolderName: 'Jose da Silva',
            cardExpirationMonth: 10,
            cardExpirationYear: 15,
            cardCvv: 314,
            amount: 1000,
        };
    });

    it('should be creatable', function() {
        var transaction = new PagarMe.Transaction();
        expect(transaction).not.toBeNull();
    });

    it('should be creatable with params', function() {
        var transaction = new PagarMe.Transaction(params);

        expect(transaction.cardNumber).toBe(params.cardNumber);
        expect(transaction.cardHolderName).toBe(params.cardHolderName);
        expect(transaction.cardExpirationMonth).toBe(params.cardExpirationMonth);
        expect(transaction.cardExpirationYear).toBe(params.cardExpirationYear);
        expect(transaction.cardCvv).toBe(params.cardCvv);
        expect(transaction.amount).toBe(params.amount);
    });

    it('should be able to charge', function() {
        var transaction = new PagarMe.Transaction(params);
        expect(transaction.status).toBe('local');

        transaction.charge();
        expect(transaction.status).toBe('paid');
    });

});
