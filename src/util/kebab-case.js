"use strict";
const strip_suffix_1 = require("./strip-suffix");
function kebabCase(identifier, suffixToStrip) {
    const name = suffixToStrip ? strip_suffix_1.default(suffixToStrip)(identifier) : identifier;
    const nameSegments = name.match(/[A-Z]{1,}[a-z]{1}[^A-Z]*/g);
    if (nameSegments.length > 1 && suffixToStrip && nameSegments.indexOf(suffixToStrip) === nameSegments.length - 1) {
        nameSegments.pop();
    }
    return nameSegments
        .map(segment => segment.toLowerCase())
        .join('-');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = kebabCase;
