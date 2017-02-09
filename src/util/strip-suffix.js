"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (suffix) { return function (value) {
    var location = value.lastIndexOf(suffix);
    return location > 0 ? value.substr(0, value.length - suffix.length) : value;
}; };
