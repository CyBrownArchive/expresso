'use strict';

var Parameter = function () {
    this.name = null;
    this.validators = [];
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

module.exports = Parameter;
