'use strict';

describe('PagarMe::Transaction', function() {

    var PagarMe
    , apiKey = 'ak_test_Rw4JR98FmYST2ngEHtMvVf5QJW7Eoo'
    , params = {};

    beforeEach(function() {
        PagarMe = require('../lib/pagarme');
        PagarMe.apiKey = apiKey;

        params = {
            card_number: '4901720080344448',
            card_holder_name: 'Jose da Silva',
            card_expiration_month: 10,
            card_expiration_year: 15,
            card_cvv: 314,
            amount: 1000,
        };
    });

    it('should be creatable', function() {
        var transaction = new PagarMe.Transaction();
        expect(transaction).not.toBeNull();
    });

    it('should be creatable with params', function() {
        var transaction = new PagarMe.Transaction(params);

        expect(transaction.card_number).toBe(params.card_number);
        expect(transaction.card_holder_name).toBe(params.card_holder_name);
        expect(transaction.card_expiration_month).toBe(params.card_expiration_month);
        expect(transaction.card_expiration_year).toBe(params.card_expiration_year);
        expect(transaction.card_cvv).toBe(params.card_cvv);
        expect(transaction.amount).toBe(params.amount);
    });

    it('should be able to charge', function(done) {
        var transaction = new PagarMe.Transaction(params);
        expect(transaction.status).toBe('local');
        expect(typeof transaction.charge).toBe('function');

        transaction.charge(function() {
            expect(transaction.id).not.toBeNull();
            expect(transaction.status).toBe('paid');
            expect(transaction.refuse_reason).toBeNull();
            expect(transaction.dateCreated).not.toBeNull();               

            done();
        });
    });

    it('should be able to list transactions', function(done) {
        var transaction = new PagarMe.Transaction();

        transaction.all(function(transactions) {
            expect(typeof transactions).toBe('object');
            expect(transactions.length).toBe(10);

            done();
        });
    });

});
