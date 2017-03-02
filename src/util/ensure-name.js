"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ensureName(target) {
    if (!target.name) {
        throw TypeError('Effectively anonymous functions/es2015 classes cannot be named via conventions.');
    }
}
exports.default = ensureName;
