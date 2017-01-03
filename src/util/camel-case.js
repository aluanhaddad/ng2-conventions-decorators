"use strict";
const strip_suffix_1 = require("./strip-suffix");
function camelCase(identifier) {
    const selector = strip_suffix_1.default('Directive')(identifier.substr(1));
    return `${identifier[0].toLowerCase()}${selector}`;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = camelCase;
