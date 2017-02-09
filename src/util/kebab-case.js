"use strict";
var strip_suffix_1 = require("./strip-suffix");
function kebabCase(identifier, suffixToStrip) {
    var name = suffixToStrip ? strip_suffix_1.default(suffixToStrip)(identifier) : identifier;
    var nameSegments = name.match(/[A-Z]{1,}[a-z]{1}[^A-Z]*/g);
    if (nameSegments.length > 1 && suffixToStrip && nameSegments.indexOf(suffixToStrip) === nameSegments.length - 1) {
        nameSegments.pop();
    }
    return nameSegments
        .map(function (segment) { return segment.toLowerCase(); })
        .join('-');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = kebabCase;
