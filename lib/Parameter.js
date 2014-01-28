'use strict';

var Parameter = function () {
    this.name = null;
    this.validators = [];
    this.convertor = null;
};

Parameter.prototype.addRegexValidator = function (regex) {
    if (!(regex instanceof RegExp)) {
        throw new Error('regex is not a RegExp');
    }
    this.validators.push(regex);
    return this;
};

Parameter.prototype.isValid = function (value) {
    for (var i = 0, max = this.validators.length; i < max; i++) {
        var validator = this.validators[i];
        if (validator instanceof RegExp) {
            if (!value.match(validator)) {
                return false;
            }
        }
    }
    return true;
};

Parameter.prototype.convert = function (convertor) {
    if (this.convertor) {
        throw new Error('Convertor already set');
    }
    if (typeof convertor !== 'function') {
        throw new Error('Convertor function must be a function');
    }
    this.convertor = convertor;
};

Parameter.prototype.doConversion = function (value) {
    return this.convertor(value);
};

module.exports = Parameter;
