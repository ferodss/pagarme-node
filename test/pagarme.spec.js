'use strict';


describe('PagarMe', function() {

    var apiKey = 'ak_test_Rw4JR98FmYST2ngEHtMvVf5QJW7Eoo',
        PagarMe;

    beforeEach(function() {
        PagarMe = require('../lib/pagarme')
    });


    it('should be able to set the API key', function() {
        PagarMe.apiKey = apiKey;
        expect(PagarMe.apiKey).toBe(apiKey);
    });

    it('endpoint should be defined', function() {
        expect(PagarMe.endpoint).toBeDefined();
        expect(PagarMe.endpoint).not.toBeNull();
    });

    it('API version should be defined', function() {
        expect(PagarMe.apiVersion).toBeDefined();
        expect(PagarMe.apiVersion).not.toBeNull();
    });

});


