"use strict";
function ensureName(target) {
    if (!target.name) {
        throw TypeError('Effectively anonymous functions/es2015 classes cannot be named via conventions.');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ensureName;
