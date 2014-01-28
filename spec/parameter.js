var Parameter = require('../lib/Parameter');

describe ('Parameter', function () {

    it ('should be a class', function () {
        Parameter.prototype.should.be.type('object');
    });
    
    it ('should instantiate', function () {
        var p = new Parameter();
    });
    
    it ('should set a name', function () {
        var p = new Parameter();
        p.name = 'foo';
    });

    describe ('validation', function () {

        var p = new Parameter();

        it ('should set a regex validator', function () {
            p.addRegexValidator(/^[0-9]*$/);
        });
        
        it ('should not set a non regex validator', function () {
            (function () {
                p.addRegexValidator('not a regex');
            }).should.throw();
        });
        
        it ('should validate', function () {
            p.isValid('13').should.be.ok;
        });

        it ('should not validate', function () {
            p.isValid('i').should.not.be.ok;
        });
    });

    describe ('conversion', function () {

        it ('should accept a function', function () {
            var p = new Parameter();
            p.convert(function() {});
        });

        it ('should not accept anything than a function', function () {
            (function () {
                var p = new Parameter();
                p.convert('not a function');
            }).should.throw();
        });

        it ('should not be called twice', function () {
            var p = new Parameter();
            p.convert(function () {});
            (function () {
                p.convert(function () {});
            }).should.throw();
        });
    });
});
