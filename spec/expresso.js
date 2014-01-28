describe ('Expresso', function () {

    var expresso = require('..');

    it ('should be a class', function () {
        expresso.Expresso.prototype.should.type('object');
    });

    it ('should create an instance', function () {
        var e = new expresso.Expresso();
    });

    describe ('.add', function () {

        var e = new expresso.Expresso();

        it ('should add a parameter', function () {
            e.add('foo1');
        });

        it ('should be fluent', function () {
            e.add('foo2').should.eql(e);
        });
    });

    describe ('.from', function () {

        var e = new expresso.Expresso();

        it ('should add a parameter from a source', function () {
            e.add('foo1').from('query');
        });
        
        it ('should be fluent', function () {
            e.add('foo2').from('query').should.eql(e);
        });

        it ('should be executed only once', function () {
            (function () {
                e.from('query');
            }).should.throw();
        });
        
        it ('should throw an error if an argument is not selected first', function () {
            var e = new expresso.Expresso();
            (function () {
                e.from('query');
            }).should.throw();
        });
    });

    describe ('.validateWithRegex', function () {

        var e = new expresso.Expresso();

        it ('should accept a regex', function () {
            e.add('foo1').validateWithRegex(/[0-9]*/);
        });

        it ('should be fluent', function () {
            e.add('foo2').validateWithRegex(/[0-9]*/).should.eql(e);
        });

        it ('should throw an expcetion if argument is not a regex', function () {
            (function () {
                e.add('foo3').validateWithRegex('not a function nor a regex');
            }).should.throw();
        });

        it ('should throw an expcetion if an argument is not selected first', function () {
            var e = new expresso.Expresso();
            (function () {
                e.validateWithRegex(/x/);
            }).should.throw();
        });
    });

    describe ('.validateWithFunction', function () {

        var e = new expresso.Expresso();

        it ('should accept a function', function () {
            e.add('foo1').validateWithFunction(function () {});
        });

        it ('should be fluent', function () {
            e.add('foo2').validateWithFunction(function () {}).should.eql(e);
        });

        it ('should throw an expcetion if argument is not a regex', function () {
            (function () {
                e.add('foo3').validateWithFunction('not a function nor a regex');
            }).should.throw();
        });

        it ('should throw an expcetion if an argument is not selected first', function () {
            var e = new expresso.Expresso();
            (function () {
                e.validateWithFunction(function () {});
            }).should.throw();
        });
    });

    describe ('.convert', function () {

        it ('should have a name before setting a conversion function', function () {
            var e = new expresso.Expresso();
            (function () {
                e.convert(function (id) {});
            }).should.throw();
        })

        it ('should accept a convert function', function () {
            var e = new expresso.Expresso();
            e.add('foo');
            e.convert(function (id) {});
        });

        it ('should throw an error if arg is not a function', function () {
            var e = new expresso.Expresso();
            e.add('foo');
            (function () {
                e.convert('not a function');
            }).should.throw();
        });
    });
});
