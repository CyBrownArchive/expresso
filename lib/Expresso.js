'use strict';

var Parameter = require('./Parameter');

var Expresso = function () {

    this.curArg = null;
};

Expresso.prototype.add = function (name) {
    this.curArg = new Parameter();
    this.curArg.name = name;
    return this;
};

Expresso.prototype.from = function (source) {
    if (!this.curArg) {
        throw new Error('An argument must be added with .add first');
    }
    if (this.curArg.source) {
        throw new Error('source already define for current parameter');
    }
    this.curArg.source = source;
    return this;
};

Expresso.prototype.validateWithRegex = function (predicate) {
    if (!this.curArg) {
        throw new Error('An argument must be added with .add first');
    }
    if (!(predicate instanceof RegExp)) {
        throw new Error('predicate must be a RegExp');
    }
    return this;
};

Expresso.prototype.validateWithFunction = function (predicate) {
    if (!this.curArg) {
        throw new Error('An argument must be added with .add first');
    }
    if (typeof predicate !== 'function') {
        throw new Error('predicate must be a Function');
    }
    return this;
};

Expresso.prototype.convert = function (convertor) {
    this.curArg.convert(convertor);
};

module.exports = Expresso;
