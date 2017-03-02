"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var strip_suffix_1 = require("./strip-suffix");
function camelCase(identifier) {
    var selector = strip_suffix_1.default('Directive')(identifier.substr(1));
    return "" + identifier[0].toLowerCase() + selector;
}
exports.default = camelCase;
